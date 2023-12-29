import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private readonly prismaService: PrismaService,
    private directionsService: DirectionsService,
  ) {}
  async create(createRouteDto: CreateRouteDto) {
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.directionsService.getDirections(
        createRouteDto.source_id,
        createRouteDto.destintation_id,
      );

    const legs = routes[0].legs[0];

    const origin = await this.prismaService.place.create({
      data: {
        name: legs.start_address,
        location: {
          create: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng,
          },
        },
      },
    });

    const destine = await this.prismaService.place.create({
      data: {
        name: legs.end_address,
        location: {
          create: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng,
          },
        },
      },
    });

    const route = await this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: origin.id,
        destination: destine.id,
        distance: legs.distance.value,
        duration: legs.duration.value,
        direction: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          request,
          routes,
        }),
      },
    });

    return { ...route };
  }

  async findPlaceById(id: string) {
    return await this.prismaService.place.findUnique({ where: { id } });
  }

  remove(id: string) {
    return `This action removes a #${id} route`;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @IsPublic()
  @Get()
  async findPlace(@Query('text') text: string) {
    return await this.placesService.findPlace(text);
  }
}

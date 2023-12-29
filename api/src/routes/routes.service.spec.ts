import { Test, TestingModule } from '@nestjs/testing';
import { RoutesService } from './routes.service';
import { Route } from './entities/route.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Coord, Place } from '@prisma/client';
import { randomUUID } from 'crypto';

const coord: Coord[] = [
  {
    id: randomUUID(),
    lat: 34.41234,
    lng: 35.41234,
  },
  {
    id: randomUUID(),
    lat: 34.41234,
    lng: 35.41234,
  },
  {
    id: randomUUID(),
    lat: 34.41234,
    lng: 35.41234,
  },
  {
    id: randomUUID(),
    lat: 34.41234,
    lng: 35.41234,
  },
];

const places: Place[] = [
  {
    id: randomUUID(),
    name: 'city mocking, state mocking 1',
    coord_id: coord[0].id,
  },
  {
    id: randomUUID(),
    name: 'city mocking, state mocking 1',
    coord_id: coord[1].id,
  },
  {
    id: randomUUID(),
    name: 'city mocking, state mocking 1',
    coord_id: coord[2].id,
  },
  {
    id: randomUUID(),
    name: 'city mocking, state mocking 1',
    coord_id: coord[3].id,
  },
];

const routes: Route[] = [
  {
    id: randomUUID(),
    name: 'route-test-1',
    source: places[0].id,
    destination: places[1].id,
    created_at: new Date(),
    updated_at: new Date(),
    distance: 9676,
    duration: 842,
    direction: `{}`,
  },
  {
    id: randomUUID(),
    name: 'route-test-2',
    source: places[2].id,
    destination: places[3].id,
    created_at: new Date(),
    updated_at: new Date(),
    distance: 9676,
    duration: 842,
    direction: `{}`,
  },
];

const db = {
  route: {
    create: jest.fn().mockReturnValue(routes[0]),
  },
};

describe('RoutesService', () => {
  let service: RoutesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutesService,
        { provide: PrismaService, useValue: [routes, places, coord] },
      ],
    }).compile();

    service = module.get<RoutesService>(RoutesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should be able create route', async () => {
    const route = await service.create({
      name: 'route-test-1',
      source_id: 'ChIJC_yU8vtSxwcRvPfx0TWeGxQ',
      destintation_id: 'ChIJqTW8OGqrwAcR84l-BgurtBE',
    });

    expect(route).toBe(routes[0]);
  });
});

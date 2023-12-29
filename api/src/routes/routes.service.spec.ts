// import { Test, TestingModule } from '@nestjs/testing';
// import { RoutesService } from './routes.service';
// import { Route } from './entities/route.entity';
// import { PrismaService } from 'src/prisma/prisma.service';

// const routes: Route[] = [];

// const db = {
//   route: {
//     create: jest.fn().mockReturnValue(routes[0]),
//   },
// };

// describe.skip('RoutesService', () => {
//   let service: RoutesService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [RoutesService, { provide: PrismaService, useValue: db }],
//     }).compile();

//     service = module.get<RoutesService>(RoutesService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

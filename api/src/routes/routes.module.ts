import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MapsModule } from 'src/maps/maps.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [MapsModule, PrismaModule],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}

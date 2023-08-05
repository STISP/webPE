import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { lojasProviders } from './lojas.providers';
import { LojasService } from './lojas.service';
import { LojasController } from './lojas.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LojasController],
  providers: [
    ...lojasProviders,
    LojasService,
  ],
})
export class LojasModule {}
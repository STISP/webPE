import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { lojasProviders } from './lojas.providers';
import { LojasService } from './lojas.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...lojasProviders,
    LojasService,
  ],
})
export class LojasModule {}
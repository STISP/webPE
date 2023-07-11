import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LojasModule } from './lojas/lojas.module';

@Module({
  imports: [
    LojasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

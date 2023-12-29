import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [
    UsuarioModule,
    ContractsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
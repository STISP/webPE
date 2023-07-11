import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configuração do CORS
   app.enableCors();

  await app.listen(3000);
}
bootstrap();

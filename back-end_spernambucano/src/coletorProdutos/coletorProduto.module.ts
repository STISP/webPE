import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ColetorProdutoController } from './coletorProduto.controller';
import { ColetorProdutoService } from './coletorProduto.service';

@Module({
  imports: [MulterModule.register()],
  controllers: [ColetorProdutoController],
  providers: [ColetorProdutoService],
})
export class ColetorProdutoModule {}

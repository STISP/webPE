import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ColetorProdutoService } from './coletorProduto.service';
import { ColetorProdutoDto } from './coletorProduto.dto';

@Controller('coletorProduto')
export class ColetorProdutoController {
  constructor(private readonly coletorProdutoService: ColetorProdutoService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const coletorProdutos: ColetorProdutoDto[] = this.parseFile(file.buffer.toString());
    const dividedColetorProdutoDtos = this.coletorProdutoService.divideColetorProdutoDtosIntoSections(coletorProdutos);
    return dividedColetorProdutoDtos;
  }

  private parseFile(fileContent: string): ColetorProdutoDto[] {
    const lines = fileContent.split('\n');
    const coletorProdutos: ColetorProdutoDto[] = [];

    for (const line of lines) {
      const [codeStr, quantityStr] = line.split(';');
      const code = parseInt(codeStr);
      const quantity = parseFloat(quantityStr.replace(',', '.'));
      coletorProdutos.push({ code, quantity });
    }

    return coletorProdutos;
  }
}

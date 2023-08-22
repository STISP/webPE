
import { Injectable } from '@nestjs/common';
import { ColetorProdutoDto } from './coletorProduto.dto';

@Injectable()
export class ColetorProdutoService {
  divideColetorProdutoDtosIntoSections(coletorProdutos: ColetorProdutoDto[]): any {
    const sections = {
      padaria: [],
      higiene: [],
    };

    for (const coletorProduto of coletorProdutos) {
      const section = coletorProduto.code % 2 === 0 ? 'padaria' : 'higiene';
      sections[section].push(coletorProduto);
    }

    return sections;
  }
}


/*// ColetorProdutoDto.service.ts
import { Injectable } from '@nestjs/common';
import { ColetorProdutoDto } from './coletorProduto.dto';

@Injectable()
export class ColetorProdutoDtoService {
  divideColetorProdutoDtosIntoSections(coletorProdutos: ColetorProdutoDtoDto[]): any {
    // Lógica para dividir os produtos em setores do supermercado
    // Aqui você pode implementar a lógica de acordo com suas regras
    // e retornar os produtos divididos por setor
    const sections = {
      padaria: [],
      higiene: [],
      // Adicione mais setores conforme necessário
    };

    for (const ColetorProduto of ColetorProdutos) {
      // Exemplo de lógica para determinar o setor com base no código do produto
      const section = ColetorProduto.code % 2 === 0 ? 'padaria' : 'higiene';
      sections[section].push(ColetorProduto);
    }

    return sections;
  }
}*/
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Lojas } from './lojas.entity';

@Injectable()
export class LojasService {
  constructor(
    @Inject('LOJAS_REPOSITORY')
    private lojasRepository: Repository<Lojas>,
  ) { }

  async findAll(): Promise<Lojas[]> {
    return this.lojasRepository.find();
  }

  getLojas(): any {
    let objetoLojas = [
      {
        "loja1": {
          "Loja": "Dom Helder",
          "LojaEndereco": "Rua João Fragoso de Medeiros, 1687 - Candeias - conj. Dom Helder",
          "LojaTelefone": "3361-1155",
          "LojaEmail": "add depois",
          "CEP": "54430-250",
          "LojaHorario": "07h às 20h",
          "cnpj": "12.493.871/0001-73",
          "SegundaASextaI": "07h",
          "SegundaASextaF": "20h",
          "SabadoI": "07h",
          "SabadoF": "20h",
          "DomingoI": "07h",
          "DomingoF": "13h",
          "mapaLojaURL": "https://goo.gl/maps/TF5nfsSXwKxkbiLf8"
        }
      }, {
        "loja1": {
          "Loja": "Dom Helder",
          "LojaEndereco": "Rua João Fragoso de Medeiros, 1687 - Candeias - conj. Dom Helder",
          "LojaTelefone": "3361-1155",
          "LojaEmail": "add depois",
          "CEP": "54430-250",
          "LojaHorario": "07h às 20h",
          "cnpj": "12.493.871/0001-73",
          "SegundaASextaI": "07h",
          "SegundaASextaF": "20h",
          "SabadoI": "07h",
          "SabadoF": "20h",
          "DomingoI": "07h",
          "DomingoF": "13h",
          "mapaLojaURL": "https://goo.gl/maps/TF5nfsSXwKxkbiLf8"
        }
      }
    ]
    return objetoLojas;
  }
}


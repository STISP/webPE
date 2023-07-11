import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
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
        "loja2": {
          "Loja": "Goiana",
          "LojaEndereco": "Rua Benjamin Constantino, 52 - Centro - Goiana - PE",
          "LojaTelefone": "3361-1155",
          "LojaEmail": "add depois",
          "CEP": "55900-000",
          "LojaHorario": "07h às 19h",
          "cnpj": "24.094.631/0001-12",
          "SegundaASextaI": "07h",
          "SegundaASextaF": "19h",
          "SabadoI": "06h",
          "SabadoF": "17h",
          "DomingoI": "07h",
          "DomingoF": "13h",
          "mapaLojaURL": "https://goo.gl/maps/AcmXccHPpnNaDsAJ9"
        }
      }
    ]
    return objetoLojas;
  }

  GetAll(): string {
    return "All!";
  }

  PostCreateNew(): string {
    return "Create New";
  }

  PutRewrite(): string {
    return "Rewrite";
  }

  Delete(): string {
    return "Delete";
  }

  DeleteAll(): string {
    return "Delete All";
  }

  Get(): string {
    return "!";
  }
}
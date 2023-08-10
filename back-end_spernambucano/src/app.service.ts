import { Injectable } from "@nestjs/common";
@Injectable()
export class AppService {
  getHello(): any {
    let objeto = {
      hello: "Hello, world!",
      nome: "teste",
      idade: 100
    }
    return objeto;
  }
}
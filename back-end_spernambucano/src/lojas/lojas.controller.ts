import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { LojasService } from "./lojas.service";
import { Lojas } from "./lojas.entity";

@Controller('lojas')
export class LojasController {
  constructor(private readonly LojasService: LojasService) { }

  @Get('listar')
  async findAll(): Promise<Lojas[]> {
    return this.LojasService.findAll();
  }

  @Get('todasLojas')
  getLojas(): any {
      return this.LojasService.getLojas();
  }
}


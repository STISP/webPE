import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('All') //rota para listar tudo
    GetAll(): string {
        return this.appService.GetAll();
    }

    @Post('CreateNew') //rota para criar
    PostCreateNew(): string {
        return this.appService.PostCreateNew();
    }

    @Put('Rewrite/:id') //rota para reescrever
    PutRewrite(): string {
        return this.appService.PutRewrite();
    }

    @Delete('Delete/:id') //rota para deletar um específicao
    Delete(): string {
        return this.appService.Delete();
    }

    @Delete('DeleteAll') //rota para deletar tudo
    DeleteAll(): string {
        return this.appService.DeleteAll();
    }

    @Get('/:id') //rota para pesquisar uma específico
    Get(): string {
        return this.appService.Get();
    }
}
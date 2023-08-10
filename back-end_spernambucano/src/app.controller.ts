import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('teste')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('teste')
    getHello(): any {
        return this.appService.getHello();
    }
}
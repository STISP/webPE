import { Body, Controller, Get, NotFoundException, Param, Post, Query, Request } from "@nestjs/common";
import { ContractsService } from './contracts.service';
import { Contract } from './contracts.entity';

@Controller('contracts')
export class ContractsController {
    constructor(private readonly contractService: ContractsService) { }

    @Get()
    async getAllContracts(): Promise<Contract[]> {
        return this.contractService.getAllContracts();
    }

    @Get(':id')
    async getContractById(@Param('id') id: string): Promise<Contract> {
        return this.contractService.findContractById(id);
    }

    @Post()
    async createContract(@Body() contract: Contract): Promise<Contract> {
        return this.contractService.createContract(contract);
    }

    @Post(':id')
    async updateContract(@Param('id') id: string, @Body() contract: Contract): Promise<Contract> {
        return this.contractService.updateContract(id, contract);
    }

    @Post('delete/:id')
    async deleteContract(@Param('id') id: string): Promise<Contract> {
        return this.contractService.deleteContract(id);
    }
}

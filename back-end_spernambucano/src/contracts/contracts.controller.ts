import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
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

    @Delete(':id')
    async deleteContract(@Param('id') id: string): Promise<void> {
        return this.contractService.deleteContract(id);
    }

    // relatorio de contratos levando em consideração loja selecionada pelo usuário
    @Post('reports/:store')
    async getContractReports(@Param() params: { store: string }): Promise<{
        activeContracts: number,
        contractsLastMonth: number,
        nextExpiration: Date,
        totalValue: number,
        inactiveContracts: number
    }> {
        const { store } = params;
        const activeContracts = await this.contractService.getActiveContracts(store);
        const contractsLastMonth = await this.contractService.getContractsLastMonth(store);
        const nextExpiration = await this.contractService.getNextExpiration(store);
        const totalValue = await this.contractService.getTotalValue(store);
        const inactiveContracts = await this.contractService.getInactiveContracts(store);

        const nextExpirationDate = new Date(nextExpiration.toString());

        return {
            activeContracts,
            contractsLastMonth,
            nextExpiration: nextExpirationDate,
            totalValue,
            inactiveContracts
        };

    }
}

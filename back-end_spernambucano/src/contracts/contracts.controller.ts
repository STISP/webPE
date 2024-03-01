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

    @Delete(':id')
    async deleteContract(@Param('id') id: string): Promise<void> {
        return this.contractService.deleteContract(id);
    }

    // relatorio de contratos levando em consideração loja selecionada pelo usuário
    @Post('reports/:store')
    async getContractReports(@Param() params: { store: string }): Promise<{
        activeContracts: number,
        contractsLastMonth: number,
        nextExpiration: Date | null,
        totalValue: number,
        inactiveContracts: number
        ExpiredContracts: number
    }> {
        const { store } = params;
        const activeContracts = await this.contractService.getActiveContracts(store);
        const contractsLastMonth = await this.contractService.getContractsLastMonth(store);
        const nextExpiration = await this.contractService.getNextExpiration(store);
        const totalValue = await this.contractService.getTotalValue(store);
        const inactiveContracts = await this.contractService.getInactiveContracts(store);
        const ExpiredContracts = await this.contractService.ExpiredContracts(store);

        const nextExpirationDate = nextExpiration ? new Date(nextExpiration.toString()) : null;

        return {
            activeContracts,
            contractsLastMonth,
            nextExpiration: nextExpirationDate,
            totalValue,
            inactiveContracts,
            ExpiredContracts
        };
    }

    // Numero de todos os contratos venciados de todas as lojas (soma)
    @Get('expired/all')
    async getTotalExpiredContractsAllStores(): Promise<number> {
        return this.contractService.getTotalExpiredContractsAllStores();
    }

    // Para editar um contrato
    @Post('edit')
    async editContract(@Param('id') id: string, @Body() updatedContract: Contract): Promise<{ oldContract: Contract, newContract: Contract }> {
        return this.contractService.editContract(id, updatedContract);
    }

    // gasto mensal dos contratos ativos para todas as lojas (soma)
    @Get('monthly/all')
    async getMonthlyExpenseAllStores(): Promise<number> {
        return this.contractService.getMonthlyExpenseAllStores();
    }

    // gasto mensal dos contratos ativos para uma loja selecionada pelo usuario
    @Get('monthly/:store')
    async getMonthlyExpense(@Param() params: { store: string }): Promise<number> {
        const { store } = params;
        return this.contractService.getMonthlyExpense(store);
    }

    // botão para desativar um contrato
    @Post('deactivate/:id')
    async deactivateContract(@Param('id') id: string): Promise<Contract> {
        return this.contractService.deactivateContract(id);
    }

    // botão para ativar um contrato
    @Post('activate/:id')
    async activateContract(@Param('id') id: string): Promise<Contract> {
        return this.contractService.activateContract(id);
    }
}

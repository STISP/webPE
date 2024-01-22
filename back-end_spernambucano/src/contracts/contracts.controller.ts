import { Body, Controller, Get, Param, Post, Delete, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';
import { ContractsService } from './contracts.service';
import { Contract } from './contracts.entity';
import { FileDTO } from "./uploand.dto";

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

    // quando o contrato é editado, o status é alterado para 'Desativado' e um novo contrato é criado com o status 'Ativo'
    @Post('edit')
    async editContract(@Param('id') id: string, @Body() updatedContract: Contract): Promise<{ oldContract: Contract, newContract: Contract }> {
        return this.contractService.editContract(id, updatedContract);
    }
}

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Contract } from './contracts.entity';
import { FileDTO } from './uploand.dto';

@Injectable()
export class ContractsService {
    constructor(
        @Inject('CONTRACT_REPOSITORY')
        private contractRepository: Repository<Contract>,
    ) { }


    async getAllContracts(): Promise<Contract[]> {
        return await this.contractRepository.find();
    }

    async findContractById(id: string): Promise<Contract> {
        const contract = await this.contractRepository.findOne({ where: { id } });
        if (!contract) {
            throw new NotFoundException(`Contrato não encontrado`);
        }
        return contract;
    }

    async createContract(contract: Contract): Promise<Contract> {
        return await this.contractRepository.save(contract);
    }

    async deleteContract(id: string): Promise<void> {
        try {
            await this.contractRepository.delete(id);
        } catch (error) {
            throw new Error('Erro ao excluir o contrato.');
        }
    }

    // relatorio de contratos
    // Número de contratos ativos apenas para uma loja selecionada
    async getActiveContracts(store: string): Promise<number> {
        const activeContracts = await this.contractRepository.count({
            where: {
                loja: store,
                status: 'Ativo',
            },
        });
        return activeContracts;
    }

    // total de contratos registrado no ultimo mês apenas para uma loja selecionada pelo usuario
    async getContractsLastMonth(store: string): Promise<number> {
        const currentDate = new Date();
        const totalContractsLastMonth = await this.contractRepository.count({
            where: {
                loja: store,
                status: 'Ativo',
                startDate: LessThanOrEqual(currentDate),
            },
        });
        return totalContractsLastMonth;
    }

    // contrato com o vencimento mais proximo apenas para uma loja selecionada pelo usuário
    async getNextExpiration(store: string): Promise<Date | null> {
        const currentDate = new Date();
        const nextExpiration = await this.contractRepository.findOne({
            where: {
                loja: store,
                status: 'Ativo',
                endDate: MoreThanOrEqual(currentDate),
            },
            order: {
                endDate: 'ASC',
            },
            select: ['endDate'],
        });

        if (!nextExpiration) {
            // Retorna null se não houver nenhum contrato próximo de vencimento
            return null;
        }

        return nextExpiration.endDate;
    }

    // Valor total dos contratos ativos apenas para uma loja selecionada pelo usuario
    async getTotalValue(store: string): Promise<number> {
        const totalValue = await this.contractRepository.createQueryBuilder('contract')
            .select('SUM(contract.contractValue)', 'total')
            .where('contract.loja = :store', { store })
            .andWhere('contract.status = :status', { status: 'Ativo' })
            .getRawOne();
        return totalValue.total;
    }

    // Número de contratos desativados apenas para uma loja selecionada pelo usuario
    async getInactiveContracts(store: string): Promise<number> {
        const inactiveContracts = await this.contractRepository.count({
            where: {
                loja: store,
                status: 'Desativado',
            },
        });
        return inactiveContracts;
    }

    // Numero de contratos venciados apenas para uma loja selecionada pelo usuario
    async ExpiredContracts(store: string): Promise<number> {
        const currentDate = new Date();
        const expiredContracts = await this.contractRepository.count({
            where: {
                loja: store,
                endDate: LessThanOrEqual(currentDate),
            },
        });
        return expiredContracts;
    }

    // Numero de todos os contratos venciados de todas as lojas (soma)
    async getTotalExpiredContractsAllStores(): Promise<number> {
        const currentDate = new Date();
        const expiredContracts = await this.contractRepository.count({
            where: {
                endDate: LessThanOrEqual(currentDate),
            },
        });
        return expiredContracts;
    }

    // editar o contrato, o contrato atual é 'deletado' e um novo é salvo
    // quando o contrato é editado, o status é alterado para 'Desativado' e um novo contrato é criado com o status 'Ativo'
    async editContract(id: string, updatedContract: Contract): Promise<{ oldContract: Contract, newContract: Contract }> {
        try {
            const contract = await this.contractRepository.findOne({ where: { id } });
            if (contract) {
                // Altera o status do contrato atual para 'Desativado'
                // contract.status = 'Desativado';
                const oldContract = await this.contractRepository.save(contract); // Save the old contract

                // adiciona o id um novo id ao contrato atualizado usando o uuidv4
                // updatedContract.id = id;
                // Cria um novo contrato com os dados atualizados
                const newContract = this.contractRepository.create(updatedContract);
                const savedNewContract = await this.contractRepository.save(newContract);

                return { oldContract, newContract: savedNewContract };
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao atualizar o contrato: ${error.message}`);
        }
    }

    // gasto mensal dos contratos ativos para todas as lojas (soma)
    async getMonthlyExpenseAllStores(): Promise<number> {
        const currentDate = new Date();
        const monthlyExpense = await this.contractRepository.createQueryBuilder('contract')
            .select('SUM(contract.monthlyValue)', 'total')
            .where('contract.status = :status', { status: 'Ativo' })
            .andWhere('contract.endDate >= :currentDate', { currentDate })
            .getRawOne();

        if (!monthlyExpense || !monthlyExpense.total) {
            return 0;
        }

        return monthlyExpense.total;
    }

    // gasto mensal dos contratos ativos para uma loja selecionada pelo usuario
    async getMonthlyExpense(store: string): Promise<number> {
        const currentDate = new Date();
        const monthlyExpense = await this.contractRepository.createQueryBuilder('contract')
            .select('SUM(contract.monthlyValue)', 'total')
            .where('contract.loja = :store', { store })
            .andWhere('contract.status = :status', { status: 'Ativo' })
            .andWhere('contract.endDate >= :currentDate', { currentDate })
            .getRawOne();

        if (!monthlyExpense || !monthlyExpense.total) {
            return 0;
        }

        return monthlyExpense.total;
    }
}

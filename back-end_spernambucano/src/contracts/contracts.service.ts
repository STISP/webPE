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

    async updateContract(id: string, updatedContract: Contract): Promise<Contract> {
        try {
            const contract = await this.contractRepository.findOne({ where: { id } });
            if (contract) {
                const updated = Object.assign(contract, updatedContract);
                return await this.contractRepository.save(updated);
            }
            return null;
        } catch (error) {
            throw new Error('Erro ao atualizar o contrato.');
        }
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

    // contrato com o vencimento mais proximo apenas para uma loja selecionada pelo usuario
    async getNextExpiration(store: string): Promise<Date> {
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
            throw new NotFoundException('Nenhum contrato próximo de vencimento encontrado.');
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

    // recebe um arquivo de qualquer tipo e salva localmente
    async uploadFile(file: FileDTO): Promise<FileDTO> {
        const { filename, originalname, mimetype, buffer, size } = file;
        const newFile = {
            filename,
            originalname,
            mimetype,
            buffer,
            size,
        };
        return newFile;
    }
}

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contract } from './contracts.entity';

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
        const contract = await this.contractRepository.findOne({ where: { id: Number(id) } });
        if (!contract) {
            throw new NotFoundException(`Contrato não encontrado`);
        }
        return contract;
    }

    async createContract(contract: Contract): Promise<Contract> {
        return await this.contractRepository.save(contract);
    }

    async updateContract(id: string, updatedContract: Contract): Promise<Contract> {
        const contract = await this.contractRepository.findOne({ where: { id: Number(id) } });
        if (contract) {
            const updated = Object.assign(contract, updatedContract);
            return await this.contractRepository.save(updated);
        }
        return null;
    }

    async deleteContract(id: string): Promise<void> {
        await this.contractRepository.delete(id);
    }

    // renovar contrato
    async renewContract(id: string, renewalContract: Contract): Promise<Contract> {
        const contract = await this.contractRepository.findOne({ where: { id: Number(id) } });
        if (contract) {
            contract.renewalContract = renewalContract;
            return await this.contractRepository.save(contract);
        }
        return null;
    }
}
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { TransferProducts } from './transferProducts.entity';

@Injectable()
export class TransferProductsService {
    constructor(
        @Inject('TRANSFERPRODUCTS_REPOSITORY')
        private transferProductsRepository: Repository<TransferProducts>,
    ) { }

    async getAllTransferProductsByPostDate(): Promise<TransferProducts[]> {
        return await this.transferProductsRepository.find({ order: { postDate: 'DESC' } });
    }

    async createTransferProduct(transferProduct: TransferProducts): Promise<TransferProducts> {
        return await this.transferProductsRepository.save(transferProduct);
    }

    async getTransferProductById(id: string): Promise<TransferProducts> {
        const transferProduct = await this.transferProductsRepository.findOne({ where: { id } });
        if (!transferProduct) {
            throw new NotFoundException('Transfer product not found');
        }
        return transferProduct;
    }

    // deletar uma transferencia
    async deleteTransferProduct(id: string): Promise<TransferProducts> {
        const transferProduct = await this.getTransferProductById(id);
        await this.transferProductsRepository.delete(id);
        return transferProduct;
    }

    async updateTransferProduct(id: string, transferProduct: TransferProducts): Promise<TransferProducts> {
        await this.transferProductsRepository.update(id, transferProduct);
        return await this.getTransferProductById(id);
    }

    // rota para pegar todas as transferencias pendentes (deliveryDate = 01/01/9999)
    async getTransferProductByDeliveryDate(): Promise<TransferProducts[]> {
        const deliveryDate = new Date('01/01/9999');
        return await this.transferProductsRepository.find({ where: { deliveryDate } });
    }

    // rota para pegar 3 ultimas das transferencias pendentes (deliveryDate = 01/01/9999) organizadas por maior data de postagem
    async getThreeLastTransferProductsByDeliveryDate(): Promise<TransferProducts[]> {
        const deliveryDate = new Date('01/01/9999');
        return await this.transferProductsRepository.find({ where: { deliveryDate }, order: { postDate: 'DESC' }, take: 3 });
    }

    // rota para mostrar o total de transferencias pendentes que no banco de dados tá "9998-12-31 21:00:00"
    async getTotalPendingTransferProducts(): Promise<number> {
        const deliveryDate = new Date('9998-12-31 21:00:00');
        return await this.transferProductsRepository.count({ where: { deliveryDate } });
    }

    // rota para pegar o total as transferencias apenas do mês atual
    async getTotalDeliveredTransferProductsOfCurrentMonth(): Promise<number> {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return await this.transferProductsRepository.count({ where: { transferDate: Between(firstDay, lastDay) } });
    }

    // rota para mostrar o total de transferencias em R$ apenas do mês atual (soma tudo de productValue e retorna o valor total)
    async getTotalDeliveredTransferProductsValueOfCurrentMonth(): Promise<number> {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const transferProducts = await this.transferProductsRepository.find({ where: { transferDate: Between(firstDay, lastDay) } });
        const totalValue = transferProducts.reduce((acc, transferProduct) => acc + (transferProduct.productValue * transferProduct.productQuantity), 0);
        return totalValue;
    }

    // rota para definir a data de entrega de uma transferencia que ainda tá como pendente - o usuario vai atualizar digitando a data e apenas mudando o dado (deliveryDate) de uma transferencia pelo id da transferencia
    async updateDeliveryDate(id: string, deliveryDate: Date): Promise<TransferProducts> {
        await this.transferProductsRepository.update(id, { deliveryDate });
        return await this.getTransferProductById(id);
    }

    // rota que vai ser usada para gerar o relatorio de transferencias entregues
    // rota para buscar por loja de origem
    // Rota para buscar produtos de transferência por um intervalo de datas específico
}
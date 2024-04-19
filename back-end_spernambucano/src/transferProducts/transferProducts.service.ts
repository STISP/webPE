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

    // rota para pegar o total de transferencias entregues de um determinado mês
    async getReportTransferProductsByDateRange(start: string, end: string): Promise<any> {
        const firstDay = new Date(new Date(start).getTime() + new Date().getTimezoneOffset() * 60000);
        const lastDay = new Date(new Date(end).getTime() + new Date().getTimezoneOffset() * 60000);
        const transferProducts = await this.transferProductsRepository.find({ where: { transferDate: Between(firstDay, lastDay) } });

        const reportDateStart = firstDay.toLocaleDateString('pt-BR');
        const reportDateEnd = lastDay.toLocaleDateString('pt-BR');

        const report = {
            header: `Todas as transferências entre as lojas`,
            products: []
        };

        const productTotals = new Map<string, { code: string, unitValue: number, totalQuantity: number, totalValue: number, stores: Map<string, { total: number, value: number }> }>();

        for (const transferProduct of transferProducts) {
            const { productName, productCode, destinationStore, productQuantity, productValue } = transferProduct;
            const totalValue = productQuantity * productValue;

            if (!productTotals.has(productName)) {
                productTotals.set(productName, { code: productCode, unitValue: productValue, totalQuantity: 0, totalValue: 0, stores: new Map<string, { total: number, value: number }>() });
            }

            const productTotal = productTotals.get(productName);
            productTotal.totalQuantity += productQuantity;
            productTotal.totalValue += totalValue;

            if (!productTotal.stores.has(destinationStore)) {
                productTotal.stores.set(destinationStore, { total: 0, value: 0 });
            }

            const storeTotal = productTotal.stores.get(destinationStore);
            storeTotal.total += productQuantity;
            storeTotal.value += totalValue;
        }

        for (const [productName, totals] of productTotals) {
            const product = {
                name: productName,
                code: totals.code,
                unitValue: totals.unitValue,
                totalQuantity: totals.totalQuantity,
                totalValue: `R$ ${totals.totalValue.toFixed(2)}`,
                stores: []
            };
            for (const [store, storeTotals] of totals.stores) {
                product.stores.push({
                    name: store,
                    total: storeTotals.total,
                    value: `R$ ${storeTotals.value.toFixed(2)}`
                });
            }
            report.products.push(product);
        }

        return report;
    }

    // api de "Controle de Uso de Material de Expediente"
    async getReportControlMaterialUseByDateRange(start: string, end: string): Promise<any> {
        const firstDay = new Date(new Date(start).getTime() + new Date().getTimezoneOffset() * 60000);
        const lastDay = new Date(new Date(end).getTime() + new Date().getTimezoneOffset() * 60000);
        const transferProducts = await this.transferProductsRepository.find({ where: { transferDate: Between(firstDay, lastDay) } });

        const reportDateStart = firstDay.toLocaleDateString('pt-BR');
        const reportDateEnd = lastDay.toLocaleDateString('pt-BR');

        const report = {
            header: `Controle de Uso de Material de Expediente`,
            products: []
        };

        const productTotals = new Map<string, { quantity: number, value: number, stores: Map<string, { quantity: number, value: number }> }>();

        for (const transferProduct of transferProducts) {
            const { productName, destinationStore, productQuantity, productValue } = transferProduct;
            const totalValue = productQuantity * productValue;

            if (!productTotals.has(productName)) {
                productTotals.set(productName, { quantity: 0, value: 0, stores: new Map<string, { quantity: number, value: number }>() });
            }

            const productTotal = productTotals.get(productName);
            productTotal.quantity += productQuantity;
            productTotal.value += totalValue;

            if (!productTotal.stores.has(destinationStore)) {
                productTotal.stores.set(destinationStore, { quantity: 0, value: 0 });
            }

            const storeTotal = productTotal.stores.get(destinationStore);
            storeTotal.quantity += productQuantity;
            storeTotal.value += totalValue;
        }

        for (const [productName, totals] of productTotals) {
            const product = {
                name: productName,
                stores: []
            };
            for (const [store, storeTotals] of totals.stores) {
                product.stores.push({
                    name: store,
                    quantity: storeTotals.quantity,
                    value: storeTotals.value
                });
            }
            report.products.push(product);
        }
        return report;
    }


}
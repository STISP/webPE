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


    // exemplo de relatorio:
    /* TRANSFERÊNCIA ENTRE LOJAS - (Material de expediente) 11/12/2023																		
     PRODUTO	CÓD. PRODUTO	VALOR UND R$	LOJA 01 	TOTAL	LOJA 02 	TOTAL	LOJA 03 	TOTAL	LOJA 04 	TOTAL	LOJA 05 	TOTAL	LOJA 06 	TOTAL	LOJA 07	TOTAL	LOJA 08	TOTAL
     DUREX	68510	 R$ 6,30 	 5 	 31,50 	 8 	 50,40 	 4 	 25,20 	 3 	 18,90 	 2 	 12,60 	 10 	 63,00 	 4 	 25,20 	 2 	 12,60 
     BOBINA P/ CAIXA	48366	 R$ 102,00 	 5 	 510,00 	 2 	 204,00 	 3 	 306,00 	 4 	 408,00 	 5 	 510,00 	 3 	 306,00 	 7 	 714,00 	 5 	 510,00 
     ETIQUETA DE GONDOLA	49087	 R$ 17,00 	 3 	 51,00 	 2 	 34,00 	 4 	 68,00 	 4 	 68,00 	 4 	 68,00 	 4 	 68,00 	 4 	 68,00 	 2 	 34,00 
     RIBBON	49086	 R$ 14,00 	 2 	 28,00 	 1 	 14,00 	 1 	 14,00 	 1 	 14,00 	 2 	 28,00 	 1 	 14,00 	 2 	 28,00 	 1 	 14,00 
     TINTA P/ IMPRESSORA PRETA	21226	 R$ 52,30 	 -   	 -   	 1 	 52,30 	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   
     TINTA P/ IMPRESSORA AZUL	21228	 R$ 52,30 	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   
     TINTA P/ IMPRESSORA AMARELA	21227	 R$ 52,30 	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 1 	 52,30 	 -   	 -   
     TINTA P/ IMPRESSORA MAJENTA	21229	 R$ 52,30 	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   
     TECLADO	67468	 R$ 29,00 	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   
     GRAMPO	67271	 R$ 6,96 	 -   	 -   	 -   	 -   	 1 	 6,96 	 -   	 -   	 -   	 -   	 1 	 6,96 	 -   	 -   	 -   	 -   
     PAPEL OFÍCIO	12762	 R$ 21,70 	 1 	 21,70 	 1 	 21,70 	 -   	 -   	 1 	 21,70 	 1 	 21,70 	 2 	 43,40 	 -   	 -   	 2 	 43,40 
     CALCULADORA 	68339	 R$ 22,31 	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   
     GRAMPEADOR		 R$ 22,97 	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   	 -   
     TOTAL ===========================			 16 	 642,20 	 15 	 376,40 	 13 	 420,16 	 13 	 530,60 	 14 	 640,30 	 21 	 501,36 	 18 	 887,50 	 12 	 614,00 */

    // relatorio referente ao exemplo acima - rota para relatorio por mes e ano de transferencia (explicação do exemplo acima): 
    /*
    a primeira coluna mostra os produtos, a segunda coluna mostra o código do produto, a terceira 
    coluna mostra o valor da unidade do produto, as colunas que contem o nome loja 1, loja 2 e etc... 
    mostra a quantidade de produtos que foi transferida para essa loja, a coluna total mostra ao lado 
    de cada loja (loja 1, loja 2 e etc...) mostra o total em reais que foi transferido para essa loja 
    (quantidade de produtos * valor da unidade do produto) e a ultima linha mostra o total de produtos 
    que foi transferido para cada loja e o total em reais que foi transferido para cada loja (soma de 
    todos os produtos e soma de todos os valores em reais que foi transferido para cada loja). em loja 1, 
    loja 2, etc... ele mostra o total de produtos pegando a soma a quantidade de todos as transferencias 
    que foram feitas para a loja de destino (destinationStore). e o total em reais ele pega a soma de todos 
    os valores em reais pegando a api de todos os produtos http://192.168.1.70:3000/estoqueDeProdutosParaTransferencia
    exemplo de retorno da rota:
    [
        {
            "id": "379aefda-34a7-4e72-a132-fe1958813157",
            "productCode": "10",
            "productName": "Caneta",
            "productQuantity": 20,
            "productPrice": 2
        },
        {
            "id": "3bc16b25-57a5-436a-a45c-24273588c35c",
            "productCode": "49087",
            "productName": "GONDOLA",
            "productQuantity": 48,
            "productPrice": 17
        }
    ]
    e ele vai pegar a quantidade de cada produto que foi transferido (destinationStore) para cada loja e o valor total em reais (quantidade * valor da unidade do produto) que foi transferido para cada loja
    */

    async getReportTransferProductsByDateRange(start: string, end: string): Promise<any> {
        const firstDay = new Date(new Date(start).getTime() + new Date().getTimezoneOffset() * 60000);
        const lastDay = new Date(new Date(end).getTime() + new Date().getTimezoneOffset() * 60000);
        const transferProducts = await this.transferProductsRepository.find({ where: { transferDate: Between(firstDay, lastDay) } });

        const reportDateStart = firstDay.toLocaleDateString('pt-BR');
        const reportDateEnd = lastDay.toLocaleDateString('pt-BR');

        const report = {
            header: `TRANSFERÊNCIA ENTRE LOJAS - (Material de expediente) ${reportDateStart} - ${reportDateEnd}`,
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
}
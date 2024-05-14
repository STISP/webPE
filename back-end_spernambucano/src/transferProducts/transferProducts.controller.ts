import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
import { TransferProductsService } from './transferProducts.service';
import { TransferProducts } from './transferProducts.entity';

@Controller('transferProducts')
export class TransferProductsController {
    constructor(private readonly transferProductsService: TransferProductsService) { }

    @Get('all')
    async getAllTransferProductsByPostDate(): Promise<TransferProducts[]> {
        return this.transferProductsService.getAllTransferProductsByPostDate();
    }

    // rota que ao invez de mostrar todos as transferencias, mostra apenas 3 ultimas transferencias
    @Get('lastThree')
    async getThreeLastTransferProductsByPostDate(): Promise<TransferProducts[]> {
        return this.transferProductsService.getThreeLastTransferProductsByPostDate();
    }

    // rota para pegar 3 ultimas transferencias pendentes
    @Get('lastThreePending')
    async getThreeLastPendingTransferProductsByPostDate(): Promise<TransferProducts[]> {
        return this.transferProductsService.getThreeLastPendingTransferProductsByPostDate();
    }

    // rota para mostrar todas as transferencias pendentes
    @Get('pending')
    async getAllPendingTransferProducts(): Promise<TransferProducts[]> {
        return this.transferProductsService.getAllPendingTransferProducts();
    }

    @Get(':id')
    async getTransferProductById(@Param('id') id: string): Promise<TransferProducts> {
        return this.transferProductsService.getTransferProductById(id);
    }

    @Post('create')
    async createTransferProduct(@Body() transferProduct: TransferProducts): Promise<TransferProducts> {
        return this.transferProductsService.createTransferProduct(transferProduct);
    }

    @Delete(':id')
    async deleteTransferProduct(@Param('id') id: string): Promise<TransferProducts> {
        return this.transferProductsService.deleteTransferProduct(id);
    }

    // atualiazar apenas o dado (deliveryDate) de uma transferencia
    @Post(':id')
    async updateTransferProduct(@Param('id') id: string, @Body() transferProduct: TransferProducts): Promise<TransferProducts> {
        return this.transferProductsService.updateTransferProduct(id, transferProduct);
    }

    // rota para mostrar o total de transferencias pendentes
    @Get('pending/total')
    async getTotalPendingTransferProducts(): Promise<number> {
        return this.transferProductsService.getTotalPendingTransferProducts();
    }

    // rota para pegar o total as transferencias apenas do mês atual
    @Get('delivered/total')
    async getTotalDeliveredTransferProductsOfCurrentMonth(): Promise<number> {
        return this.transferProductsService.getTotalDeliveredTransferProductsOfCurrentMonth();
    }

    // rota para mostrar o total de transferencias em R$ apenas do mês atual
    @Get('delivered/totalValue')
    async getTotalDeliveredTransferProductsValueOfCurrentMonth(): Promise<number> {
        return this.transferProductsService.getTotalDeliveredTransferProductsValueOfCurrentMonth();
    }

    // rota para definir a data de entrega de uma transferencia que ainda tá como pendente - ele vai atualizar apenas o dado (deliveryDate) de uma transferencia pelo id
    @Post('deliveryDate/:id')
    async updateDeliveryDate(@Param('id') id: string, @Body('deliveryDate') deliveryDate: Date): Promise<TransferProducts> {
        return this.transferProductsService.updateDeliveryDate(id, deliveryDate);
    }

    // rota para pegar o total de transferencias entregues de um determinado mês
    @Post('report/transferProductsByMonthAndYear')
    async getReportTransferProductsByDateRange(@Body() dateRange: { start: string, end: string }): Promise<any> {
        const { start, end } = dateRange;
        return this.transferProductsService.getReportTransferProductsByDateRange(start, end);
    }

    // rota para pegar o total de transferencias entregues de um determinado mês
    @Post('report/controlOfUseOfStationery')
    async getReportControlMaterialUseByDateRange(@Body('start') start: string, @Body('end') end: string): Promise<any> {
        return this.transferProductsService.getReportControlMaterialUseByDateRange(start, end);
    }

    // rota para esse relatorio de gastos por loja
    @Post('report/expenditureMaterial')
    async getExpenditureMaterialReportByStoreAndDateRange(@Body() data: { storeName: string, start: string, end: string }): Promise<any> {
        const { storeName, start, end } = data;
        return this.transferProductsService.getExpenditureMaterialReportByStoreAndDateRange(storeName, start, end);
    }

    // rota que vai pegar a data desde a primeira transferencia até a ultima transferencia, para dividir em anos e meses.
    /*Exemplo de json que vai retornar depois de fazer essa consulta acima:
    {
        "years": [
            {
                "year": 2021,
                "months": [
                    {
                        "month": 1
                        // com base nesse mês, vai pegar todas as transferencias que foram feitas nesse mês. exemplo do json para esse mês:
                        "transferProducts": [
                            {
                                "id": "1",
                                "storeName": "Loja 1",
                                "productName": "Caneta",
                                "quantity": 10,
                                "unitValue": 1.5,
                                "totalValue": 15,
                                "postDate": "2021-01-01",
                                "deliveryDate": "2021-01-05",
                                "status": "Entregue"
                            },
                            {
                                "id": "2",
                                "storeName": "Loja 2",
                                "productName": "Lapis",
                                "quantity": 20,
                                "unitValue": 1.5,
                                "totalValue": 30,
                                "postDate": "2021-01-01",
                                "deliveryDate": "2021-01-05",
                                "status": "Entregue"
                            }
                        ]
                    },
                    {
                        "month": 2
                    },
                    {
                        "month": 3
                    },
                ]
            },
            {
                "year": 2022,
                "months": [
                    {
                        "month": 1
                    }
                ]
            }
        ]

        1. Crie uma rota para retornar todos os anos em que há transferências de produtos. Esta rota não precisa retornar nenhum detalhe sobre as transferências, apenas os anos.
        2. Crie uma rota para retornar todos os meses de um determinado ano em que há transferências de produtos. Novamente, esta rota não precisa retornar nenhum detalhe sobre as transferências, apenas os meses.
        3. Finalmente, crie uma rota para retornar todas as transferências de produtos para um determinado mês e ano. Esta rota retornará os detalhes das transferências.
        
        - Desta forma, o cliente pode primeiro solicitar a lista de anos, depois escolher um ano e solicitar a lista de meses para aquele ano, e finalmente escolher um mês e solicitar as transferências para aquele mês e ano. Isso minimiza a quantidade de dados que precisa ser enviada em cada resposta e permite que o cliente controle o nível de detalhe que eles recebem.
        
        controller tá assim:
        // rota para pegar todos os anos que tem transferencias
    async getYears(): Promise<number[]> {
        const transferProducts = await this.transferProductsRepository.find();
        const years = transferProducts.map(transferProduct => transferProduct.transferDate.getFullYear());
        return Array.from(new Set(years));
    }

    // rota para pegar todos os meses de um determinado ano que tem transferencias
    async getMonths(year: number): Promise<number[]> {
        const transferProducts = await this.transferProductsRepository.find();
        const months = transferProducts
            .filter(transferProduct => transferProduct.transferDate.getFullYear() === year)
            .map(transferProduct => transferProduct.transferDate.getMonth());
        return Array.from(new Set(months));
    }

    // rota para pegar todas as transferencias de um determinado mês e ano
    async getTransferProductsByMonthAndYear(month: number, year: number): Promise<any> {
        const transferProducts = await this.transferProductsRepository.find();
        return transferProducts
            .filter(transferProduct => transferProduct.transferDate.getFullYear() === year && transferProduct.transferDate.getMonth() === month);
    }
    */

    @Get('report/years')
    async getYears(): Promise<number[]> {
        return this.transferProductsService.getYears();
    }
    // api: http://192.168.1.70:3000/transferProducts/report/years

    @Get('report/months/:year')
    async getMonths(@Param('year') year: number): Promise<number[]> {
        return this.transferProductsService.getMonths(year);
    }
    // api: http://192.168.1.70:3000/transferProducts/report/months/2023

    @Get('report/transferProducts/:month/:year')
    async getTransferProductsByMonthAndYear(@Param('month') month: number, @Param('year') year: number): Promise<any> {
        return this.transferProductsService.getTransferProductsByMonthAndYear(month, year);
    }
    // api: http://192.168.1.70:3000/transferProducts/report/transferProducts/9/2023

    // ideias de rotas para fazer:
    // rota para pegar o total de transferencias entregues de um determinado mês
    // rota para pegar o total de transferencias em R$ apenas do mês atual
}
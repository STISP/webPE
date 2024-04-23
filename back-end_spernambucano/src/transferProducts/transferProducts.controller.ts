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

    // relatorio por loja, onde vai dizer o produto, mes, a quantidade e o valor. no caso vai fazer isso para todos os meses selecionado pelo usuario tipo, se ele escolher jan, fev e mar, vai mostrar a quantidade e o valor relacionado a cada mes para cada produto. o nome dessa planilha é "Material de Expediente - ${ano} (${loja})
    /*exemplo de como vai ser o retorno. essa é a planilha que vai ser de exemplo, faça uma estrutura de dados para retornar e fazer algo parecido com isso. (obs: de janeiro a agosto tá vazio, mais da para entender oque quero). no caso o usuario vai dizer a loja que quer, o dia, mes e ano

        PRODUTOS	janeiro		fevereiro		março		abril		maio		junho		julho		agosto		setembro		outubro		novembro		dezembro		TOTAL DO ANO	
        Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor	Quant.	Valor
    DUREX																	9	R$ 44,10	25	R$ 136,50	15	 94,50 	10	R$ 63,00	59	 338,10 
    BOBINA P/ CAIXA																	9	R$ 918,00	10	R$ 1.020,00	7	 714,00 	10	R$ 1.020,00	36	 3.672,00 
    ETIQUETA DE GONDOLA																	8	R$ 136,00	10	R$ 170,00	8	 136,00 	8	R$ 136,00	34	 578,00 
    RIBBON																	1	R$ 14,00	6	R$ 84,00	3	 42,00 	2	R$ 28,00	12	 168,00 
    TINTA P/ IMPRESSORA PRETA																	1	R$ 52,30	0	R$ 0,00	1	 52,30 	0	R$ 0,00	2	 104,60 
    TINTA P/ IMPRESSORA AZUL																	1	R$ 52,30	0	R$ 0,00	1	 52,30 	0	R$ 0,00	2	 104,60 
    TINTA P/ IMPRESSORA AMARELA																	1	R$ 52,30	2	R$ 104,60	1	 52,30 	0	R$ 0,00	4	 209,20 
    TINTA P/ IMPRESSORA MAJENTA																	1	R$ 52,30	1	R$ 52,30	1	 52,30 	0	R$ 0,00	3	 156,90 
    TECLADO																	0	R$ 0,00	0	R$ 0,00	0	 -   	0	R$ 0,00	0	 -   
    GRAMPO																	1	R$ 6,96	0	R$ 0,00	1	 6,96 	1	R$ 5,02	3	 18,94 
    PAPEL OFÍCIO																	2	R$ 43,40	3	R$ 65,10	2	 43,40 	1	R$ 21,70	8	 173,60 
    CALCULADORA																	0	R$ 0,00	0	R$ 0,00	0	 -   	0	R$ 0,00	0	 -   
    GRAMPEADOR																	1	R$ 22,97	0	R$ 0,00	0	 -   	0	R$ 0,00	1	 22,97 
    TOTAL R$	0	R$ 0,00	0	R$ 0,00	0	R$ 0,00	0	R$ 0,00	0	R$ 0,00	0	R$ 0,00	0	R$ 0,00	0	R$ 0,00	35	R$ 1.394,63	57	R$ 1.632,50	40	R$ 1.246,06	32	R$ 1.273,72	164	 5.546,91 
    */

    @Post('report/materialUseByStoreAndDateRange')
    async getReportMaterialUseByStoreAndDateRange(@Body('start') start: string, @Body('end') end: string, @Body('store') store: string): Promise<any> {
        return this.transferProductsService.getReportMaterialUseByStoreAndDateRange(start, end, store);
    }
    // exemplo de rota para testar - http://localhost:3000/transferProducts/report/materialUseByStoreAndDateRange
    // exemplo de body para teste - {"start": "2021-01-01", "end": "2021-12-31", "store": "Loja 1"}
}
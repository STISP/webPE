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

    // rota para pegar 3 ultimas das transferencias pendentes (deliveryDate = 01/01/9999) organizadas por maior data de postagem
    @Get('pending/lastThree')
    async getThreeLastTransferProductsByDeliveryDate(): Promise<TransferProducts[]> {
        return this.transferProductsService.getThreeLastTransferProductsByDeliveryDate();
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

    // - RELATORIOS -
    // mostrar todos os produtos com quantidade menor que 10
    // @Get('relatorioProdutosComQuantidadeMenorQue10')
    // async getProductsLessThan10(): Promise<Products[]> {
    //     return this.productsService.getProductsLessThan10();
    // }

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

    // rota para trazer as transferencias de produtos realizadas em um determinado mês e ano inicial e final
    @Post('report/transferProductsByMonthAndYear')
    async getReportTransferProductsByDateRange(@Body() dateRange: { start: string, end: string }): Promise<any> {
        const { start, end } = dateRange;
        return this.transferProductsService.getReportTransferProductsByDateRange(start, end);
    }
    // para chamar essa api é: http://localhost:3000/transferProducts/report
    // e no body da requisição é: { "start": "2024-12-01", "end": "2024-12-31" }

}
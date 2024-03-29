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


    // rota que vai ser usada para gerar o relatorio de transferencias entregues
    // rota para buscar por loja de origem
    // Rota para buscar produtos de transferência por um intervalo de datas específico
    // @Get('dateRange/:startDate/:endDate')
    // async getTransferProductsByDateRange(
    //     @Param('startDate') startDate: string,
    //     @Param('endDate') endDate: string
    // ): Promise<TransferProducts[]> {
    //     return this.transferProductsService.getTransferProductsByDateRange(startDate, endDate);
    // }
}
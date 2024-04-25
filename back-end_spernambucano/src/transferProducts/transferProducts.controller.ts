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
}
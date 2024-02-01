import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
import { TransferProductsService } from './transferProducts.service';
import { TransferProducts } from './transferProducts.entity';

@Controller('transferProducts')
export class TransferProductsController {
    constructor(private readonly transferProductsService: TransferProductsService) { }

    @Get()
    async getAllTransferProducts(): Promise<TransferProducts[]> {
        return this.transferProductsService.getAllTransferProducts();
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
    async deleteTransferProduct(@Param('id') id: string): Promise<void> {
        return this.transferProductsService.deleteTransferProduct(id);
    }

    // atualiazar apenas o dado (deliveryDate) de uma transferencia
    @Post(':id')
    async updateTransferProduct(@Param('id') id: string, @Body() transferProduct: TransferProducts): Promise<TransferProducts> {
        return this.transferProductsService.updateTransferProduct(id, transferProduct);
    }

    // rota para pegar todas as transferencias pendentes (deliveryDate = 01/01/9999)
    @Get('pending')
    async getTransferProductByDeliveryDate(): Promise<TransferProducts[]> {
        return this.transferProductsService.getTransferProductByDeliveryDate();
    }

    // rota para pegar todas as transferencias entregues (deliveryDate != 01/01/9999)
    // rota que vai ser usada para gerar o relatorio de transferencias entregues
    // Rota para buscar produtos de transferência por um intervalo de datas específico
    // @Get('dateRange/:startDate/:endDate')
    // async getTransferProductsByDateRange(
    //     @Param('startDate') startDate: string,
    //     @Param('endDate') endDate: string
    // ): Promise<TransferProducts[]> {
    //     return this.transferProductsService.getTransferProductsByDateRange(startDate, endDate);
    // }
    // rota para buscar por loja de origem
}
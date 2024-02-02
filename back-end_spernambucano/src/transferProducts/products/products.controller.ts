import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
import { ProductsService } from './products.service';
import { Products } from './products.entity';

@Controller('productTransferido')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProducts(): Promise<Products[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Products> {
        return this.productsService.getProductById(id);
    }

    @Post('create')
    async createProduct(@Body() product: Products): Promise<Products> {
        return this.productsService.createProduct(product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productsService.deleteProduct(id);
    }
}
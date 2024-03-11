import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
import { ProductsService } from './products.service';
import { Products } from './products.entity';

@Controller('estoqueDeProdutosParaTransferencia')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // mostrar todos os produtos
    @Get()
    async getAllProducts(): Promise<Products[]> {
        return this.productsService.getAllProducts();
    }

    // procurar um produto pelo id
    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Products> {
        return this.productsService.getProductById(id);
    }

    // adicionar um novo produto ao estoque
    @Post('create')
    async createProduct(@Body() product: Products): Promise<Products> {
        return this.productsService.createProduct(product);
    }

    // deletar um produto
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productsService.deleteProduct(id);
    }

    // adicionar quantidade a um produto no estoque pelo productCode e vai somar a quantidade atual em productQuantity com a quantidade que foi passada pelo usuario
    @Post('addQuantity/:productCode')
    async addQuantity(@Param('productCode') productCode: string, @Body() product: Products): Promise<Products> {
        return this.productsService.addQuantity(productCode, product);
    }
    // para enviar a quantidade que deseja adicionar ao produto, deve-se passar o productQuantity no body da requisição
    // um exemplo de requisição: http://localhost:3000/estoqueDeProdutosParaTransferencia/addQuantity/100
    // e no body da requisição, passar o productQuantity, por exemplo: { "productQuantity": 10 }

    // subtrair quantidade a um produto no estoque pelo productCode e vai subtrair a quantidade atual em productQuantity com a quantidade que foi passada pelo usuario
    @Post('subtractQuantity/:productCode')
    async subtractQuantity(@Param('productCode') productCode: string, @Body() product: Products): Promise<Products> {
        return this.productsService.subtractQuantity(productCode, product);
    }

}
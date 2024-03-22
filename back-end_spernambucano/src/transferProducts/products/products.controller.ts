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

    // rota para procurar produto por productCode
    @Get('productCode/:productCode')
    async getProductByCode(@Param('productCode') productCode: string): Promise<Products> {
        return this.productsService.getProductByCode(productCode);
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
    // para enviar a quantidade que deseja adicionar ao produto, é necessário passar a quantidade no corpo da requisição
    // um exemplo de requisição: http://localhost:3000/estoqueDeProdutosParaTransferencia/addQuantity e no corpo da requisição passar o productQuantity e o productCode
    @Post('addQuantity')
    async addQuantity(@Body() product: Products): Promise<Products> {
        return this.productsService.addQuantity(product);
    }

    // subtrair quantidade a um produto no estoque pelo productCode e vai subtrair a quantidade atual em productQuantity com a quantidade que foi passada pelo usuario
    @Post('removeQuantity')
    async subtractQuantity(@Body() product: Products): Promise<Products> {
        return this.productsService.subtractQuantity(product);
    }
}
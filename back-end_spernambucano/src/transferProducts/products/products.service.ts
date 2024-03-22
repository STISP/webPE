import { Injectable, Inject, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Products } from './products.entity';
import { FindOperator } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCTS_REPOSITORY')
        private productsRepository: Repository<Products>,
    ) { }

    // rota para mostrar todos os produtos
    async getAllProducts(): Promise<Products[]> {
        return this.productsRepository.find();
    }

    // rota para procurar um produto pelo id
    async getProductById(id: string): Promise<Products> {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    // rota para procurar produto por productCode
    async getProductByCode(productCode: string): Promise<Products> {
        const product = await this.productsRepository.findOne({ where: { productCode } });
        if (!product) {
            throw new NotFoundException('Produto não encontrado');
        }
        return product;
    }

    // rota para criar um novo produto
    async createProduct(product: Products): Promise<Products> {
        const existingProduct = await this.productsRepository.findOne({ where: { productCode: product.productCode } });
        if (existingProduct) {
            throw new HttpException('Produto já existe registrado no estoque', HttpStatus.BAD_REQUEST);
        }
        return this.productsRepository.save(product);
    }

    // rota para deletar um produto
    async deleteProduct(id: string): Promise<void> {
        await this.productsRepository.delete(id);
    }

    // adicionar quantidade a um produto no estoque pelo productCode e vai somar a quantidade atual em productQuantity com a quantidade que foi passada pelo usuario
    // para enviar a quantidade que deseja adicionar ao produto, é necessário passar a quantidade no corpo da requisição
    // um exemplo de requisição: http://localhost:3000/estoqueDeProdutosParaTransferencia/addQuantity e no corpo da requisição passar o productQuantity e o productCode
    async addQuantity(product: Products): Promise<Products> {
        const productToUpdate = await this.productsRepository.findOne({ where: { productCode: product.productCode } });
        if (!productToUpdate) {
            throw new NotFoundException('Produto não encontrado');
        }
        productToUpdate.productQuantity = productToUpdate.productQuantity + parseInt(product.productQuantity.toString());
        return this.productsRepository.save(productToUpdate);
    }

    // rota para subtrair quantidade a um produto no estoque pelo productCode
    async subtractQuantity(product: Products): Promise<Products> {
        const productToUpdate = await this.productsRepository.findOne({ where: { productCode: product.productCode } });
        if (!productToUpdate) {
            throw new NotFoundException('Produto não encontrado');
        }
        const newQuantity = productToUpdate.productQuantity - parseInt(product.productQuantity.toString());
        if (newQuantity < 0) {
            throw new HttpException('Não há estoque suficiente', HttpStatus.BAD_REQUEST);
        }
        productToUpdate.productQuantity = newQuantity;
        return this.productsRepository.save(productToUpdate);
    }
}
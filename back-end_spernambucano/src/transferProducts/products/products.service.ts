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

    // rota para adicionar quantidade a um produto no estoque pelo productCode
    async addQuantity(productCode: string, product: Products): Promise<Products> {
        const productToUpdate = await this.productsRepository.findOne({ where: { productCode } });
        if (!productToUpdate) {
            throw new NotFoundException('Produto não encontrado');
        }
        productToUpdate.productQuantity += product.productQuantity;
        return this.productsRepository.save(productToUpdate);
    }

    // rota para subtrair quantidade a um produto no estoque pelo productCode
    async subtractQuantity(productCode: string, product: Products): Promise<Products> {
        const productToUpdate = await this.productsRepository.findOne({ where: { productCode } });
        if (!productToUpdate) {
            throw new NotFoundException('Produto não encontrado');
        }
        if (productToUpdate.productQuantity < product.productQuantity) {
            throw new NotFoundException(`Sem estoque suficiente para a quantidade desejada. Estoque atual: ${productToUpdate.productQuantity}`);
        }
        productToUpdate.productQuantity -= product.productQuantity;
        return this.productsRepository.save(productToUpdate);
    }

}
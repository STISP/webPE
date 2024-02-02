import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Products } from './products.entity';
import { FindOperator } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCTS_REPOSITORY')
        private productsRepository: Repository<Products>,
    ) { }

    async getAllProducts(): Promise<Products[]> {
        return this.productsRepository.find();
    }

    async getProductById(id: string): Promise<Products> {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async createProduct(product: Products): Promise<Products> {
        return this.productsRepository.save(product);
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productsRepository.delete(id);
    }
}
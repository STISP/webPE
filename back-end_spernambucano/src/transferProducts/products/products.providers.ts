import { DataSource } from 'typeorm';
import { Products } from './products.entity';

export const productsProviders = [
    {
        provide: 'PRODUCTS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Products),
        inject: ['DATA_SOURCE'],
    },
];
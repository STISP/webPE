import { DataSource } from 'typeorm';
import { TransferProducts } from './transferProducts.entity';

export const transferProductsProviders = [
    {
        provide: 'TRANSFERPRODUCTS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TransferProducts),
        inject: ['DATA_SOURCE'],
    },
];
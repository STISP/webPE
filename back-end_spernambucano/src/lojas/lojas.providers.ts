import { DataSource } from 'typeorm';
import { Lojas } from './lojas.entity';

export const lojasProviders = [
  {
    provide: 'LOJAS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lojas),
    inject: ['DATA_SOURCE'],
  },
];
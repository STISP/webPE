import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { transferProductsProviders } from './transferProducts.providers';
import { TransferProductsService } from './transferProducts.service';
import { TransferProductsController } from './transferProducts.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [TransferProductsController],
    providers: [
        ...transferProductsProviders,
        TransferProductsService,
    ],
    exports: [TransferProductsService],
})

export class TransferProductsModule { }


import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { contractProviders } from './contracts.providers';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ContractsController],
    providers: [
        ...contractProviders,
        ContractsService,
    ],
    exports: [ContractsService],
})
export class ContractsModule { }
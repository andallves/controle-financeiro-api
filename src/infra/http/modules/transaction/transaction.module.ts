import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/infra/http/database/database.module';
import { CreateTransactionUseCase } from 'src/modules/transaction/useCase/createTransactionUseCase/create-transaction.useCase';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [CreateTransactionUseCase],
})
export class TransactionModule {}

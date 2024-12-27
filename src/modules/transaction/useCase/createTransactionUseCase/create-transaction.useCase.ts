import { Injectable } from '@nestjs/common';
import { PaymentMethod } from 'src/modules/transaction/entities/enums/payment-method.enum';
import { TransactionRepository } from 'src/modules/transaction/repositories/transaction.repository';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';

interface CreateTransactionResquest {
  description: string;
  category: number;
  data: Date;
  value: number;
  paymentMethod: PaymentMethod;
  userId: string;
}

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionResquest: CreateTransactionResquest) {
    const transaction = new Transaction({
      description: transactionResquest.description,
      category: transactionResquest.category,
      data: transactionResquest.data,
      value: transactionResquest.value,
      paymentMethod: transactionResquest.paymentMethod,
      userId: transactionResquest.userId,
    });
    await this.transactionRepository.create(transaction);
    return transaction;
  }
}

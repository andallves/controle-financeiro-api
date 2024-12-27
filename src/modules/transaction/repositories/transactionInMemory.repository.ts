import { TransactionRepository } from 'src/modules/transaction/repositories/transaction.repository';
import { Transaction } from '@prisma/client';

export class TransactionInMemoryRepository implements TransactionRepository {
  public transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}

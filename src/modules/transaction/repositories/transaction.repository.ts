import { Transaction } from 'src/modules/transaction/entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<void>;
}

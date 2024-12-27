import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { Transaction as TransactionRaw } from '@prisma/client';

export class PrismaTransactionMapper {
  static toPrisma({
    id,
    description,
    category,
    data,
    value,
    paymentMethod,
    userId,
    createdAt,
  }: Transaction): TransactionRaw {
    return {
      id,
      description,
      category,
      data,
      value,
      paymentMethod,
      userId,
      createdAt,
    };
  }

  static toDomain({ id, ...transactionData }: TransactionRaw): Transaction {
    return new Transaction(
      {
        ...transactionData,
      },
      id,
    );
  }
}

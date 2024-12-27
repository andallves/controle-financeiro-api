import { Transaction } from 'src/modules/transaction/entities/transaction.entity';

export class TransactionViewModel {
  static toHttp(transation: Transaction) {
    return {
      id: transation.id,
      description: transation.description,
      category: transation.category,
      data: transation.data,
      value: transation.value,
      paymentMethod: transation.paymentMethod,
      userId: transation.userId,
      createdAt: transation.createdAt,
    };
  }
}

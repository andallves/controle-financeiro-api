import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { TransactionRepository } from 'src/modules/transaction/repositories/transaction.repository';
import { PrismaTransactionMapper } from 'src/infra/http/database/prisma/mappers/prisma-transaction.mapper';
import { PrismaService } from 'src/infra/http/database/prisma/prisma.service';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(transaction: Transaction): Promise<void> {
    const transactionRaw = PrismaTransactionMapper.toPrisma(transaction);

    await this.prisma.transaction.create({ data: transactionRaw });
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionUseCase } from 'src/modules/transaction/useCase/createTransactionUseCase/create-transaction.useCase';
import { TransactionViewModel } from 'src/infra/http/modules/transaction/viewModel/transaction-view.model';
import { CreateTransactionDto } from 'src/infra/http/modules/transaction/dtos/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction =
      await this.createTransactionUseCase.execute(createTransactionDto);

    return TransactionViewModel.toHttp(transaction);
  }
}

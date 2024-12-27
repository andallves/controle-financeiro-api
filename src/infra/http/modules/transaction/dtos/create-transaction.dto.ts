import { PaymentMethod } from 'src/modules/transaction/entities/enums/payment-method.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  category: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

import { Entity } from 'typeorm';
import { Replace } from 'src/utils/replace';
import { randomUUID } from 'crypto';
import { PaymentMethod } from 'src/modules/transaction/entities/enums/payment-method.enum';

interface TransactionSchema {
  description: string;
  category: number;
  data: Date;
  value: number;
  paymentMethod: PaymentMethod;
  userId: string;
  createdAt: Date;
}

@Entity()
export class Transaction {
  props: TransactionSchema;
  private readonly _id: string;

  constructor(
    props: Replace<TransactionSchema, { createdAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.description = description;
  }

  get category(): number {
    return this.props.category;
  }

  set category(category: string) {
    this.category = category;
  }

  get data(): Date {
    return this.props.data;
  }

  set data(data: string) {
    this.data = data;
  }

  get value(): number {
    return this.props.value;
  }

  set value(value: number) {
    this.value = value;
  }

  get paymentMethod(): number {
    return this.props.paymentMethod;
  }

  set paymentMethod(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

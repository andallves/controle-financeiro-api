import { Entity } from 'typeorm';
import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface UserSchema {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}
@Entity()
export class User {
  props: UserSchema;
  private readonly _id: string;

  constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set passwword(paswword: string) {
    this.passwword = paswword;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.name = name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

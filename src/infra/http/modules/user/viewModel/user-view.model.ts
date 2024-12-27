import { User } from 'src/modules/user/entities/user.entity';

export class UserViewModel {
  static toHttp({ id, name, email, createdAt }: User) {
    return {
      id,
      name,
      email,
      createdAt,
    };
  }
}

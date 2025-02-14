import { User } from 'src/modules/user/entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}

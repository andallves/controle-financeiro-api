import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { User } from 'src/modules/user/entities/user.entity';

export class UserInMemoryRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }
}

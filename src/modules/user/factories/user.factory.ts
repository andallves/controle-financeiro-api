import { User } from 'src/modules/user/entities/user.entity';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@email.com',
      name: 'Vitor',
      password: '123456',
      ...override,
    },
    id,
  );
};

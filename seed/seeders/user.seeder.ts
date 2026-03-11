import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import { AppDataSource } from '../../ormconfigs';
import { UserEntity } from '../../src/api/user/entities/user.entity';
import { Roles } from '../../libs/enum/src/role.enum';

export async function seedUsers() {
  const userRepository = AppDataSource.getRepository(UserEntity);

  await userRepository.query('TRUNCATE TABLE "users" CASCADE');
  const users = Array.from({ length: 10 }, () => ({
    email: faker.internet.email(),
    role: Roles.USER,
    password: '123456',
  }));

  users.push({
    email: 'admin@gmail.com',
    role: Roles.SUPER_ADMIN,
    password: '123456',
  });

  // Hash passwords manually since bulk save doesn't trigger @BeforeInsert
  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await argon2.hash(user.password),
    })),
  );

  const savedUsers = await userRepository.save(hashedUsers);

  console.table(savedUsers.map((u) => ({ id: u.id, email: u.email })));

  return savedUsers;
}

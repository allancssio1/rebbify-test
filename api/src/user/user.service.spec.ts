import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

const users: User[] = [
  {
    id: randomUUID(),
    email: 'mock-email-1@email.com',
    password: 'password-mock-1' || null,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    email: 'mock-email-2@email.com',
    password: 'password-mock-2' || null,
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    email: 'mock-email-3@email.com',
    password: 'password-mock-3' || null,
    created_at: new Date(),
  },
];

const db = {
  user: {
    findMany: jest.fn().mockResolvedValue(users),
    findUnique: jest.fn().mockResolvedValue(users[0]),
    findFirst: jest.fn().mockResolvedValue(users[0]),
    create: jest.fn().mockReturnValue(users[0]),
  },
};

describe('Testing UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: PrismaService, useValue: db }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('Should be get user by email', async () => {
    const user = await service.findByEmail('mock-email@email.com');
    expect(user).toEqual(
      expect.objectContaining({
        email: 'mock-email-1@email.com',
      }),
    );
  });

  it('Should be create user', async () => {
    const user = await service.create({
      email: 'mock-emai1-1@email.com',
      password: 'passwor-mock',
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user).toEqual(
      expect.objectContaining({
        email: 'mock-email-1@email.com',
        password: null,
      }),
    );
  });

  it('Should be get all users', async () => {
    const usersArray = await service.findAll();

    expect(usersArray).toEqual([
      expect.objectContaining({
        email: 'mock-email-1@email.com',
      }),
      expect.objectContaining({
        email: 'mock-email-2@email.com',
      }),
      expect.objectContaining({
        email: 'mock-email-3@email.com',
      }),
    ]);
  });

  it('Should be get user by id', async () => {
    const user = await service.findUserById('mock-email-1@email.com');

    expect(user).toEqual(
      expect.objectContaining({
        email: 'mock-email-1@email.com',
      }),
    );
  });
});

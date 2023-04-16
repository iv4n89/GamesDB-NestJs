import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { eventNames } from 'src/events/eventNames';
import { UserCreatedEvent } from 'src/events/UserCreatedEvent.event';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/roles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    const userQb = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await userQb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password, ...rest } = createUserDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.usersRepository.create({
      ...rest,
      password: hashedPassword,
      role:
        !!createUserDto?.role &&
        (await this.roleRepository.findOne({
          where: { id: createUserDto?.role },
        })),
    });

    const _user = await this.usersRepository.save(newUser);

    this.eventEmitter.emit(
      eventNames.user.created,
      new UserCreatedEvent({
        userId: _user.id,
        payload: _user,
      }),
    );

    return _user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOneOrFail({
      where: { username },
    });
  }

  login(username: string) {
    return this.usersRepository.findOneOrFail({
      where: { username },
      relations: ['role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    delete updateUserDto.password;

    if (updateUserDto?.role) {
      const role: Role = await this.roleRepository.findOneOrFail({
        where: { id: updateUserDto?.role },
      });
      user.role = role;
      delete updateUserDto.role;
    }

    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    return await this.usersRepository.delete({ id });
  }
}

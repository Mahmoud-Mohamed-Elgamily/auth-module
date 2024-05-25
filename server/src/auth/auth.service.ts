import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entity/user.entity';
import { UserResponseType } from './types/userResponse.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async login(body: LoginDto) {
    const user = await this.userModel
      .findOne({ email: body.email })
      .select('+password');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(body.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async register(body: RegisterDto) {
    const user = await this.userModel.findOne({ email: body.email });

    if (user) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = new this.userModel(body);
    return createdUser.save();
  }

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      name: userEntity.name,
      email: userEntity.email,
      token: this.generateJwt(userEntity),
    };
  }

  private generateJwt(userEntity: UserEntity): string {
    return sign({ email: userEntity.email }, 'JWT_SECRET');
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userModel.findOne({ email });
  }
}

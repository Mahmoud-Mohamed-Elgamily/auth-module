import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ExpressRequest } from '../middlewares/auth.middleware';
import { UserResponseType } from './types/userResponse.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.login(body);
    return this.authService.buildUserResponse(user);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.authService.register(body);
    return this.authService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.buildUserResponse(request.user);
  }
}

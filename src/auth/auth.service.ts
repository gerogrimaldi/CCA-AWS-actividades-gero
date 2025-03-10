import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.getUserByEmail(loginAuthDto.email);
    if (!user || !(await bcrypt.compare(loginAuthDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    // el payload genera los claims del token
    // los claims 
    const payload = { username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const hashedPassword: string = await bcrypt.hash(registerAuthDto.password, 10);
    const user = await this.userService.createUser({
      username: registerAuthDto.username,
      email: registerAuthDto.email,
      password: hashedPassword,
    });

    const transformedUser = plainToInstance(User, user);
    
    return transformedUser;
  }


}

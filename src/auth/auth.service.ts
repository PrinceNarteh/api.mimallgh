import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailOrPhoneNumber: string, password: string) {
    const user = await this.userService.findOneByEmailOrPhoneNumber(
      emailOrPhoneNumber,
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    let payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    let payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

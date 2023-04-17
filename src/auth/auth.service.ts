import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user = await this.userService.findOneWithEmail(email);

    if (user && (await bcrypt.compare(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      role: user.role,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}

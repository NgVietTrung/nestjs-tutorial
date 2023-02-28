import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './interfaces/user.interface';

@Controller('api/v1/auth')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('signup')
  async signup(@Body() user: Users): Promise<Users> {
    return this.usersService.signup(user);
  }

  @Get('currentUser/:id')
  @UseGuards(JwtAuthGuard)
  async currentUser(@Param('id') id: number): Promise<CurrentUser> {
    const user: Users = await this.usersService.getCurrentUser(id);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.usersService.login(req.user);
  }
}

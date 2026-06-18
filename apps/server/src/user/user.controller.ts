import { Controller, Get, Post, Body, Param, Query, UseGuards, UsePipes } from '@nestjs/common';

import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto';
import { User } from '@user/user.entity';

import { ValidationPipe } from '@shared/pipes/validation.pipe';
import { JwtAuthGuard } from '@auth/auth.guard';
import { CurrentUser } from '@user/user.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('role') role?: string): Promise<any[]> {
    return await this.userService.findAll(0, 100, role);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: any): Promise<any> {
    return await this.userService.findById(user.id);
  }

  @Get('me/addresses')
  @UseGuards(JwtAuthGuard)
  async getAddresses(@CurrentUser() user: any): Promise<any> {
    return await this.userService.getAddresses(user.id);
  }

  @Post('me/addresses')
  @UseGuards(JwtAuthGuard)
  async createAddress(@CurrentUser() user: any, @Body() data: any): Promise<any> {
    return await this.userService.createAddress(user.id, data);
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard)
  async findByEmail(@Param('email') email: string): Promise<any> {
    return await this.userService.findByEmail(email);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<any> {
    return await this.userService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() data: CreateUserDto): Promise<any> {
    return await this.userService.create(data);
  }
}


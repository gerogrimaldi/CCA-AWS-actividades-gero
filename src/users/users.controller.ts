import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByEmailRequestDto } from './dto/get-user-by-email';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // @Get(':email')
  // findUserByEmail(@Param('email') getUserByEmailReqDto: GetUserByEmailRequestDto) {  
  //   return this.usersService.getUserByEmail(getUserByEmailReqDto.email);
  // }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @Delete(':email')
  // removeUserByEmail(@Param('email') email: string) {
  //   return this.usersService.removeByEmail(email);
  // }
}

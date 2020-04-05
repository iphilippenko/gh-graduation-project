import {
  Controller,
  UseGuards,
  Post,
  Body,
  Req,
  Get,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiQueries } from 'src/common/decorators/swagger.decorators';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({ status: 201 })
  @ApiQueries([{ name: 'userName' }, { name: 'password' }])
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  getProfile(@Req() { user: { _id } }): Promise<User> {
    return this.usersService.findById(_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateProfile(
    @Req() { user: { _id } },
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(_id, body);
  }
}

import {
  Controller,
  UseGuards,
  Post,
  Body,
  Req,
  Get,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SearchQueries } from 'src/common/dto/SearchQueries.dto';
import { ApiQueries, Auth } from 'src/common/decorators';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Auth()
  @Get()
  findAll(@Query() query?: SearchQueries) {
    return this.usersService.findAll(query);
  }

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

  @Auth()
  @Get('info')
  getProfile(@Req() { user: { _id } }): Promise<User> {
    return this.usersService.findById(_id);
  }

  @Auth()
  @Put()
  updateProfile(
    @Req() { user: { _id } },
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(_id, body);
  }
}

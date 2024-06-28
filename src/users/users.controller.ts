import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Usuarios')
@Controller('users')
export class UsersController {}

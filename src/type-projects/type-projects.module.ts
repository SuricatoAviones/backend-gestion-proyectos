import { Module } from '@nestjs/common';
import { TypeProjectsService } from './type-projects.service';
import { TypeProjectsController } from './type-projects.controller';

@Module({
  controllers: [TypeProjectsController],
  providers: [TypeProjectsService],
})
export class TypeProjectsModule {}

import { Module } from '@nestjs/common';
import { ForumService } from './forums.service';
import { ForumsController } from './forums.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Forum } from './entity/forum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forum, Project])],
  controllers: [ForumsController],
  providers: [ForumService],
})
export class ForumsModule {}

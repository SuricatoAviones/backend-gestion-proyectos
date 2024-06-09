import { Module } from '@nestjs/common';
import { UserHistoriesService } from './user-histories.service';
import { UserHistoriesController } from './user-histories.controller';
import { UserHistory } from './entities/user-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserHistory, Project])],
  controllers: [UserHistoriesController],
  providers: [UserHistoriesService],
})
export class UserHistoriesModule {}

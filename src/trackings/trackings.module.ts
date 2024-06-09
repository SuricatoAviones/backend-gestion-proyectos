import { Module } from '@nestjs/common';
import { TrackingsService } from './trackings.service';
import { TrackingsController } from './trackings.controller';
import { Tracking } from './entities/tracking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { StatusTask } from 'src/status-task/entities/status-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracking, Task, StatusTask])],
  controllers: [TrackingsController],
  providers: [TrackingsService],
})
export class TrackingsModule {}

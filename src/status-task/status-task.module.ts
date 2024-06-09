import { Module } from '@nestjs/common';
import { StatusTaskService } from './status-task.service';
import { StatusTaskController } from './status-task.controller';
import { StatusTask } from './entities/status-task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatusTask])],
  controllers: [StatusTaskController],
  providers: [StatusTaskService],
})
export class StatusTaskModule {}

import { Module } from '@nestjs/common';
import { StatusTaskService } from './status-task.service';
import { StatusTaskController } from './status-task.controller';

@Module({
  controllers: [StatusTaskController],
  providers: [StatusTaskService],
})
export class StatusTaskModule {}

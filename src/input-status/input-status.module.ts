import { Module } from '@nestjs/common';
import { InputStatusService } from './input-status.service';
import { InputStatusController } from './input-status.controller';

@Module({
  controllers: [InputStatusController],
  providers: [InputStatusService],
})
export class InputStatusModule {}

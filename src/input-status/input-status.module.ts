import { Module } from '@nestjs/common';
import { InputStatusService } from './input-status.service';
import { InputStatusController } from './input-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputStatus } from './entities/input-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InputStatus])],
  controllers: [InputStatusController],
  providers: [InputStatusService],
})
export class InputStatusModule {}

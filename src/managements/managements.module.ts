import { Module } from '@nestjs/common';
import { ManagementsService } from './managements.service';
import { ManagementsController } from './managements.controller';

@Module({
  controllers: [ManagementsController],
  providers: [ManagementsService],
})
export class ManagementsModule {}

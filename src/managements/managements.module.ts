import { Module } from '@nestjs/common';
import { ManagementsService } from './managements.service';
import { ManagementsController } from './managements.controller';
import { Management } from './entities/management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Management])],
  controllers: [ManagementsController],
  providers: [ManagementsService],
})
export class ManagementsModule {}

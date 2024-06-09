import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Management } from 'src/managements/entities/management.entity';
import { Worker } from 'src/workers/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Management, Worker])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}

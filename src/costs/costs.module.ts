import { Module } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { Cost } from './entities/cost.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cost, Project])],
  controllers: [CostsController],
  providers: [CostsService],
})
export class CostsModule {}

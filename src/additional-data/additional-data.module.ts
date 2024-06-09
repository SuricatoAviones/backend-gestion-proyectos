import { Module } from '@nestjs/common';
import { AdditionalDataService } from './additional-data.service';
import { AdditionalDataController } from './additional-data.controller';
import { AdditionalDatum } from './entities/additional-datum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalDatum])],
  controllers: [AdditionalDataController],
  providers: [AdditionalDataService],
})
export class AdditionalDataModule {}

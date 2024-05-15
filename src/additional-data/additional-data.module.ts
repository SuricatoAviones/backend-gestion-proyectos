import { Module } from '@nestjs/common';
import { AdditionalDataService } from './additional-data.service';
import { AdditionalDataController } from './additional-data.controller';

@Module({
  controllers: [AdditionalDataController],
  providers: [AdditionalDataService],
})
export class AdditionalDataModule {}

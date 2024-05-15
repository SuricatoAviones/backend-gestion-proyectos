import { Injectable } from '@nestjs/common';
import { CreateStatusTaskDto } from './dto/create-status-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';

@Injectable()
export class StatusTaskService {
  create(createStatusTaskDto: CreateStatusTaskDto) {
    return 'This action adds a new statusTask';
  }

  findAll() {
    return `This action returns all statusTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusTask`;
  }

  update(id: number, updateStatusTaskDto: UpdateStatusTaskDto) {
    return `This action updates a #${id} statusTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusTask`;
  }
}

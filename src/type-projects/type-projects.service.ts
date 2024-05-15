import { Injectable } from '@nestjs/common';
import { CreateTypeProjectDto } from './dto/create-type-project.dto';
import { UpdateTypeProjectDto } from './dto/update-type-project.dto';

@Injectable()
export class TypeProjectsService {
  create(createTypeProjectDto: CreateTypeProjectDto) {
    return 'This action adds a new typeProject';
  }

  findAll() {
    return `This action returns all typeProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeProject`;
  }

  update(id: number, updateTypeProjectDto: UpdateTypeProjectDto) {
    return `This action updates a #${id} typeProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeProject`;
  }
}

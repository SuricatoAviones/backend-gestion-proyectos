import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entity/forum.entity';
import { CreateForumDto } from './dto/create-forum.dto';
import { ResponseForumDto } from './dto/response-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';

@Injectable()
export class ForumService {
  constructor(@InjectRepository(Forum)
  private repository: Repository<Forum>){

  }

  async create(createForumDto: CreateForumDto): Promise<ResponseForumDto> {
    try {
      const forum = this.repository.create({
        i018f_i003t_entrada: createForumDto.i018f_i003t_entrada,
  
      })
      return new ResponseForumDto(await this.repository.save(forum))
    } catch (error) {
           throw new BadRequestException(error)

    }
  
  }

  async findAll(): Promise<Array<ResponseForumDto>> {
    try {
      const forums = await this.repository.find({
        relations: {
          i018f_i003t_entrada: true
        }
      })
      return forums.map(forum => new ResponseForumDto(forum))
    } catch (error) {
           throw new BadRequestException(error)

    }
  
  }

  async findOne(i018t_foro: number) {
    try {
      const forum = await this.repository.findOne({
        where: {
          i018t_foro
        },
        relations: {
          i018f_i003t_entrada: true,
        }
      })
      if (!forum) throw new NotFoundException();
      return new ResponseForumDto(forum)
    } catch (error) {
      
    }


  }

  async update(i016i_foro: number, updateForumDto: UpdateForumDto): Promise <UpdateForumDto> {
    try {
      const forum = await this.findOne(i016i_foro);
      await this.repository.update(i016i_foro, {
        i018f_i003t_entrada: updateForumDto.i018f_i003t_entrada,
      });
      return new UpdateForumDto(forum);
    } catch (error) {
           throw new BadRequestException(error)

    }

  }

  async remove(i016i_foro: number): Promise<ResponseForumDto> {
    try {
      const forum = await this.findOne(i016i_foro);
      await this.repository.delete(i016i_foro)
      return new ResponseForumDto(forum)
    } catch (error) {
           throw new BadRequestException(error)
;
    }

  }
}



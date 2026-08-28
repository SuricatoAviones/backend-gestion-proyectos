import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entity/forum.entity';
import { CreateForumDto } from './dto/create-forum.dto';
import { ResponseForumDto } from './dto/response-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private repository: Repository<Forum>,
    private dataSource: DataSource,
  ) {}

  private qbForum(qb: SelectQueryBuilder<Forum>): SelectQueryBuilder<Forum> {
    return qb.leftJoinAndSelect('forum.i018f_i003t_entrada', 'entrada');
  }

  async create(createForumDto: CreateForumDto): Promise<ResponseForumDto> {
    return this.dataSource.transaction(async (manager) => {
      const forum = manager.create(Forum, {
        i018f_i003t_entrada: createForumDto.i018f_i003t_entrada,
      });
      return new ResponseForumDto(await manager.save(forum));
    });
  }

  async findAll(): Promise<Array<ResponseForumDto>> {
    const forums = await this.qbForum(
      this.repository.createQueryBuilder('forum'),
    ).getMany();
    return forums.map((forum) => new ResponseForumDto(forum));
  }

  async findOne(i018t_foro: number) {
    const forum = await this.qbForum(
      this.repository.createQueryBuilder('forum'),
    )
      .where('forum.i018t_foro = :id', { id: i018t_foro })
      .getOne();
    if (!forum) throw new NotFoundException();
    return new ResponseForumDto(forum);
  }

  async update(
    i016i_foro: number,
    updateForumDto: UpdateForumDto,
  ): Promise<UpdateForumDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(Forum, i016i_foro, {
        i018f_i003t_entrada: updateForumDto.i018f_i003t_entrada,
      });
      const forum = await this.qbForum(
        manager.createQueryBuilder(Forum, 'forum'),
      )
        .where('forum.i018t_foro = :id', { id: i016i_foro })
        .getOne();
      if (!forum) throw new NotFoundException();
      return new ResponseForumDto(forum);
    });
  }

  async remove(i016i_foro: number): Promise<ResponseForumDto> {
    return this.dataSource.transaction(async (manager) => {
      const forum = await this.qbForum(
        manager.createQueryBuilder(Forum, 'forum'),
      )
        .where('forum.i018t_foro = :id', { id: i016i_foro })
        .getOne();
      if (!forum) throw new NotFoundException();
      await manager.delete(Forum, i016i_foro);
      return new ResponseForumDto(forum);
    });
  }
}

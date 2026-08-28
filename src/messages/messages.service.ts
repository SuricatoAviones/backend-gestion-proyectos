import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { ResponseMessageDto } from './dto/response-messages.dto';
import { Message } from './entity/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
    private dataSource: DataSource,
  ) {}

  private qbMessage(
    qb: SelectQueryBuilder<Message>,
  ): SelectQueryBuilder<Message> {
    return qb
      .leftJoinAndSelect('message.i018f_i001t_usuario', 'usuario')
      .leftJoinAndSelect('message.i018f_i019t_foro', 'foro');
  }

  async create(
    createMessageDto: CreateMessageDto,
  ): Promise<ResponseMessageDto> {
    return this.dataSource.transaction(async (manager) => {
      const message = manager.create(Message, {
        tx_mensaje: createMessageDto.tx_mensaje,
        i018f_i001t_usuario: createMessageDto.i018f_i001t_usuario,
        i018f_i019t_foro: createMessageDto.i018f_i019t_foro,
        createdAt: new Date(),
      });
      return new ResponseMessageDto(await manager.save(message));
    });
  }

  async findAll(): Promise<Array<ResponseMessageDto>> {
    const messages = await this.qbMessage(
      this.repository.createQueryBuilder('message'),
    ).getMany();
    return messages.map((message) => new ResponseMessageDto(message));
  }

  async findOne(i019i_mensaje: number) {
    const message = await this.qbMessage(
      this.repository.createQueryBuilder('message'),
    )
      .where('message.i019i_mensaje = :id', { id: i019i_mensaje })
      .getOne();
    if (!message) throw new NotFoundException();
    return new ResponseMessageDto(message);
  }

  async update(
    i019i_mensaje: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<UpdateMessageDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(Message, i019i_mensaje, {
        tx_mensaje: updateMessageDto.tx_mensaje,
        i018f_i001t_usuario: updateMessageDto.i018f_i001t_usuario,
        i018f_i019t_foro: updateMessageDto.i018f_i019t_foro,
      });
      const message = await this.qbMessage(
        manager.createQueryBuilder(Message, 'message'),
      )
        .where('message.i019i_mensaje = :id', { id: i019i_mensaje })
        .getOne();
      if (!message) throw new NotFoundException();
      return new ResponseMessageDto(message);
    });
  }

  async remove(i016i_message: number): Promise<ResponseMessageDto> {
    return this.dataSource.transaction(async (manager) => {
      const message = await this.qbMessage(
        manager.createQueryBuilder(Message, 'message'),
      )
        .where('message.i019i_mensaje = :id', { id: i016i_message })
        .getOne();
      if (!message) throw new NotFoundException();
      await manager.delete(Message, i016i_message);
      return new ResponseMessageDto(message);
    });
  }

  async findAllByForum(
    i018f_i019t_foro: number,
  ): Promise<ResponseMessageDto[]> {
    const messages = await this.qbMessage(
      this.repository.createQueryBuilder('message'),
    )
      .where('foro.i018t_foro = :fid', { fid: i018f_i019t_foro })
      .getMany();
    return messages.map((message) => new ResponseMessageDto(message));
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessageDto } from './dto/response-messages.dto';
import { Message } from './entity/message.entity';

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(Message)
    private repository: Repository<Message>) {

    }

    async create(createMessageDto: CreateMessageDto): Promise<ResponseMessageDto> {
        try {
            const message = this.repository.create({
                tx_mensaje: createMessageDto.tx_mensaje,
                i018f_i001t_usuario: createMessageDto.i018f_i001t_usuario,
                i018f_i019t_foro: createMessageDto.i018f_i019t_foro,
                createdAt: new Date()
            })
            return new ResponseMessageDto(await this.repository.save(message))
        } catch (error) {
                 throw new BadRequestException(error)

        }

    }

    async findAll(): Promise<Array<ResponseMessageDto>> {
        try {
            const messages = await this.repository.find({
                relations: {
                    i018f_i001t_usuario: true,
                    i018f_i019t_foro: true,
                }
            })
            return messages.map(message => new ResponseMessageDto(message))
        } catch (error) {
                 throw new BadRequestException(error)

        }

    }

    async findOne(i019i_mensaje: number) {
        try {
            const message = await this.repository.findOne({
                where: {
                    i019i_mensaje
                },
                relations: {
                    i018f_i019t_foro: true,
                    i018f_i001t_usuario: true,
                }
            })
            if (!message) throw new NotFoundException();
            return new ResponseMessageDto(message)
        } catch (error) {

        }


    }

    async update(i019i_mensaje: number, updateMessageDto: UpdateMessageDto): Promise<UpdateMessageDto> {
        try {
            const message = await this.findOne(i019i_mensaje);
            await this.repository.update(i019i_mensaje, {
                tx_mensaje: updateMessageDto.tx_mensaje,
                i018f_i001t_usuario: updateMessageDto.i018f_i001t_usuario,
                i018f_i019t_foro: updateMessageDto.i018f_i019t_foro,
            });
            return new UpdateMessageDto(message);
        } catch (error) {
                 throw new BadRequestException(error)

        }

    }

    async remove(i016i_message: number): Promise<ResponseMessageDto> {
        try {
            const message = await this.findOne(i016i_message);
            await this.repository.delete(i016i_message)
            return new ResponseMessageDto(message)
        } catch (error) {
                 throw new BadRequestException(error)
;
        }

    }

    async findAllByForum(i018f_i019t_foro: number): Promise<ResponseMessageDto[]> {
        try {
            const messages = await this.repository.find({
                where: {
                    i018f_i019t_foro: {
                        i018t_foro: i018f_i019t_foro
                    }
                },
                relations: {
                    i018f_i001t_usuario: true,
                    i018f_i019t_foro: true,
                }
            })
            return messages.map(message => new ResponseMessageDto(message))
        } catch (error) {

        }
    }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseTrackingDto } from './dto/response-trackings.dto';
import { Tracking } from './entities/tracking.entity';

@Injectable()
export class TrackingsService {
  constructor(@InjectRepository(Tracking)
  private repository: Repository<Tracking>) {

  }

  async create(createTrackingDto: CreateTrackingDto): Promise<CreateTrackingDto> {

    try {
      const tracking = this.repository.create({
        nu_completado: createTrackingDto.nu_completado,
        fe_plan_inicio: createTrackingDto.fe_plan_inicio,
        fe_plan_fin: createTrackingDto.fe_plan_fin,
        fe_real_inicio: createTrackingDto.fe_real_inicio,
        fe_real_fin: createTrackingDto.fe_plan_fin,
        i014f_i015t_estado_tarea: createTrackingDto.i014f_i015t_estado_tarea,
        i014f_i013t_tarea: createTrackingDto.i014f_i013t_tarea,
      })
      return new ResponseTrackingDto(await this.repository.save(tracking))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(): Promise<Array<ResponseTrackingDto>> {
    try {
      const data = await this.repository.find({
        relations: {
          i014f_i013t_tarea: true,
          i014f_i015t_estado_tarea: true,
        }
      });
      return data.map(tracking => new ResponseTrackingDto(tracking))
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findOne(i014i_seguimiento: number): Promise<ResponseTrackingDto> {
    try {
      const tracking = await this.repository.findOne({
        where: {
          i014i_seguimiento,
        },
        relations: {
          i014f_i013t_tarea: true,
          i014f_i015t_estado_tarea: true,
        }
      });
      if (!tracking) throw new NotFoundException();
      return new ResponseTrackingDto(tracking)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async update(i014i_seguimiento: number, updateTrackingDto: UpdateTrackingDto): Promise<UpdateTrackingDto> {
    try {
      const tracking = await this.repository.update(i014i_seguimiento, {
        nu_completado: updateTrackingDto.nu_completado,
        fe_plan_inicio: updateTrackingDto.fe_plan_inicio,
        fe_plan_fin: updateTrackingDto.fe_plan_fin,
        fe_real_inicio: updateTrackingDto.fe_real_inicio,
        fe_real_fin: updateTrackingDto.fe_plan_fin,
        i014f_i015t_estado_tarea: updateTrackingDto.i014f_i015t_estado_tarea,
        i014f_i013t_tarea: updateTrackingDto.i014f_i013t_tarea,
      })
      return new UpdateTrackingDto(tracking);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(i014i_seguimiento: number): Promise<ResponseTrackingDto> {
    try {
      const tracking = await this.findOne(i014i_seguimiento);
      await this.repository.delete(i014i_seguimiento);
      return new ResponseTrackingDto(tracking)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}

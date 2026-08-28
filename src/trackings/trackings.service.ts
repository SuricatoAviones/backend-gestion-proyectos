import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Tracking } from './entities/tracking.entity';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { ResponseTrackingDto } from './dto/response-trackings.dto';

@Injectable()
export class TrackingsService {
  constructor(
    @InjectRepository(Tracking)
    private repository: Repository<Tracking>,
    private dataSource: DataSource,
  ) {}

  private qbTracking(
    qb: SelectQueryBuilder<Tracking>,
  ): SelectQueryBuilder<Tracking> {
    return qb
      .leftJoinAndSelect('tracking.i014f_i013t_tarea', 'tarea')
      .leftJoinAndSelect('tarea.i013f_i003t_entrada', 'entrada')
      .leftJoinAndSelect('entrada.i003f_i011_tipo_proyecto', 'tipo')
      .leftJoinAndSelect('tipo.i011f_i012t_fase_proyecto', 'faseTipo')
      .leftJoinAndSelect('entrada.i003f_i005t_fase_entrada', 'faseEntrada')
      .leftJoinAndSelect('entrada.i003f_i010t_area_tecnica', 'area')
      .leftJoinAndSelect('entrada.i003f_i006t_estado_entrada', 'estado')
      .leftJoinAndSelect('entrada.i003f_i004t_datos_adi', 'datosAdi')
      .leftJoinAndSelect('tracking.i014f_i015t_estado_tarea', 'estadoTarea');
  }

  async create(
    createTrackingDto: CreateTrackingDto,
  ): Promise<ResponseTrackingDto> {
    return this.dataSource.transaction(async (manager) => {
      const tracking = manager.create(Tracking, {
        nu_completado_real: createTrackingDto.nu_completado_real,
        nu_completado_planificado: createTrackingDto.nu_completado_planificado,
        fe_plan_inicio: createTrackingDto.fe_plan_inicio,
        fe_plan_fin: createTrackingDto.fe_plan_fin,
        fe_real_inicio: createTrackingDto.fe_real_inicio,
        fe_real_fin: createTrackingDto.fe_plan_fin,
        i014f_i015t_estado_tarea: createTrackingDto.i014f_i015t_estado_tarea,
        i014f_i013t_tarea: createTrackingDto.i014f_i013t_tarea,
      });
      const result = await manager.save(tracking);
      const saved = await this.qbTracking(
        manager.createQueryBuilder(Tracking, 'tracking'),
      )
        .where('tracking.i014i_seguimiento = :id', {
          id: result.i014i_seguimiento,
        })
        .getOne();
      return new ResponseTrackingDto(saved);
    });
  }

  async findAll(): Promise<Array<ResponseTrackingDto>> {
    const data = await this.qbTracking(
      this.repository.createQueryBuilder('tracking'),
    ).getMany();
    return data.map((tracking) => new ResponseTrackingDto(tracking));
  }

  async findOne(i014i_seguimiento: number): Promise<ResponseTrackingDto> {
    const tracking = await this.qbTracking(
      this.repository.createQueryBuilder('tracking'),
    )
      .where('tracking.i014i_seguimiento = :id', { id: i014i_seguimiento })
      .getOne();
    if (!tracking) throw new NotFoundException();
    return new ResponseTrackingDto(tracking);
  }

  async update(
    i014i_seguimiento: number,
    updateTrackingDto: UpdateTrackingDto,
  ): Promise<UpdateTrackingDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(Tracking, i014i_seguimiento, {
        nu_completado_real: updateTrackingDto.nu_completado_real,
        nu_completado_planificado: updateTrackingDto.nu_completado_planificado,
        fe_plan_inicio: updateTrackingDto.fe_plan_inicio,
        fe_plan_fin: updateTrackingDto.fe_plan_fin,
        fe_real_inicio: updateTrackingDto.fe_real_inicio,
        fe_real_fin: updateTrackingDto.fe_plan_fin,
        i014f_i015t_estado_tarea: updateTrackingDto.i014f_i015t_estado_tarea,
      });
      const tracking = await this.qbTracking(
        manager.createQueryBuilder(Tracking, 'tracking'),
      )
        .where('tracking.i014i_seguimiento = :id', { id: i014i_seguimiento })
        .getOne();
      if (!tracking) throw new NotFoundException();
      return new ResponseTrackingDto(tracking);
    });
  }

  async remove(i014i_seguimiento: number): Promise<ResponseTrackingDto> {
    return this.dataSource.transaction(async (manager) => {
      const tracking = await this.qbTracking(
        manager.createQueryBuilder(Tracking, 'tracking'),
      )
        .where('tracking.i014i_seguimiento = :id', { id: i014i_seguimiento })
        .getOne();
      if (!tracking) throw new NotFoundException();
      await manager.delete(Tracking, i014i_seguimiento);
      return new ResponseTrackingDto(tracking);
    });
  }
}

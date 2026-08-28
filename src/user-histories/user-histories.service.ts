import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { UserHistory } from './entities/user-history.entity';
import { CreateUserHistoryDto } from './dto/create-user-history.dto';
import { UpdateUserHistoryDto } from './dto/update-user-history.dto';
import { ResponseUserHistoryDto } from './dto/response-user-history.dto';

@Injectable()
export class UserHistoriesService {
  constructor(
    @InjectRepository(UserHistory)
    private repository: Repository<UserHistory>,
    private dataSource: DataSource,
  ) {}

  private qbUserHistory(
    qb: SelectQueryBuilder<UserHistory>,
  ): SelectQueryBuilder<UserHistory> {
    return qb
      .leftJoinAndSelect('userHistory.i013f_i003t_entrada', 'entrada')
      .leftJoinAndSelect('entrada.i003f_i010t_area_tecnica', 'area')
      .leftJoinAndSelect('entrada.i003f_i011_tipo_proyecto', 'tipo')
      .leftJoinAndSelect('tipo.i011f_i012t_fase_proyecto', 'faseTipo')
      .leftJoinAndSelect('entrada.i003f_i006t_estado_entrada', 'estado')
      .leftJoinAndSelect('entrada.i0003f_i008t_equipo_trabajo', 'equipo')
      .leftJoinAndSelect('equipo.c008f_i001t_trabajador', 'tr')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_funcional', 'gf')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_galba', 'gg')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_tecnica', 'gt')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_funcional', 'lf')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_negocio', 'ln')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_tecnico', 'lt')
      .leftJoinAndSelect('entrada.i003f_i005t_fase_entrada', 'faseEntrada')
      .leftJoinAndSelect('entrada.i003f_i004t_datos_adi', 'datosAdi');
  }

  async create(
    createUserHistoryDto: CreateUserHistoryDto,
  ): Promise<ResponseUserHistoryDto> {
    return this.dataSource.transaction(async (manager) => {
      const userHistory = manager.create(UserHistory, {
        co_historia: createUserHistoryDto.co_historia,
        in_titulo: createUserHistoryDto.in_titulo,
        tx_descripcion: createUserHistoryDto.tx_descripcion,
        tx_rol: createUserHistoryDto.tx_rol,
        tx_funcionalidad: createUserHistoryDto.tx_funcionalidad,
        tx_criterio: createUserHistoryDto.tx_criterio,
        i013f_i003t_entrada: createUserHistoryDto.i013f_i003t_entrada,
      });
      return new ResponseUserHistoryDto(await manager.save(userHistory));
    });
  }

  async findAll(): Promise<Array<ResponseUserHistoryDto>> {
    const data = await this.qbUserHistory(
      this.repository.createQueryBuilder('userHistory'),
    ).getMany();
    return data.map((uHistory) => new ResponseUserHistoryDto(uHistory));
  }

  async findOne(
    i007i_historia_usuario: number,
  ): Promise<ResponseUserHistoryDto> {
    const userHistory = await this.qbUserHistory(
      this.repository.createQueryBuilder('userHistory'),
    )
      .where('userHistory.i007i_historia_usuario = :id', {
        id: i007i_historia_usuario,
      })
      .getOne();
    if (!userHistory) throw new NotFoundException();
    return new ResponseUserHistoryDto(userHistory);
  }

  async update(
    i007i_historia_usuario: number,
    updateUserHistoryDto: UpdateUserHistoryDto,
  ): Promise<UpdateUserHistoryDto> {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(UserHistory, i007i_historia_usuario, {
        co_historia: updateUserHistoryDto.co_historia,
        in_titulo: updateUserHistoryDto.in_titulo,
        tx_descripcion: updateUserHistoryDto.tx_descripcion,
        tx_rol: updateUserHistoryDto.tx_rol,
        tx_funcionalidad: updateUserHistoryDto.tx_funcionalidad,
        tx_criterio: updateUserHistoryDto.tx_criterio,
        i013f_i003t_entrada: updateUserHistoryDto.i013f_i003t_entrada,
      });
      const userHistory = await this.qbUserHistory(
        manager.createQueryBuilder(UserHistory, 'userHistory'),
      )
        .where('userHistory.i007i_historia_usuario = :id', {
          id: i007i_historia_usuario,
        })
        .getOne();
      if (!userHistory) throw new NotFoundException();
      return new ResponseUserHistoryDto(userHistory);
    });
  }

  async remove(
    i007i_historia_usuario: number,
  ): Promise<ResponseUserHistoryDto> {
    return this.dataSource.transaction(async (manager) => {
      const userHistory = await this.qbUserHistory(
        manager.createQueryBuilder(UserHistory, 'userHistory'),
      )
        .where('userHistory.i007i_historia_usuario = :id', {
          id: i007i_historia_usuario,
        })
        .getOne();
      if (!userHistory) throw new NotFoundException();
      await manager.delete(UserHistory, i007i_historia_usuario);
      return new ResponseUserHistoryDto(userHistory);
    });
  }
}

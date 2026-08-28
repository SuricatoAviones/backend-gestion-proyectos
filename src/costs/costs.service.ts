import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Cost } from './entities/cost.entity';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { ResponseCostDto } from './dto/response-cost.dto';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Cost)
    private repository: Repository<Cost>,
    private dataSource: DataSource,
  ) {}

  private qbCost(qb: SelectQueryBuilder<Cost>): SelectQueryBuilder<Cost> {
    return qb
      .leftJoinAndSelect('cost.i016f_i003t_entrada', 'entrada')
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

  async create(createCostDto: CreateCostDto): Promise<ResponseCostDto> {
    return this.dataSource.transaction(async (manager) => {
      const cost = manager.create(Cost, {
        nu_monto: createCostDto.nu_monto,
        i016f_i003t_entrada: createCostDto.i016f_i003t_entrada,
        in_titulo: createCostDto.in_titulo,
      });
      return new ResponseCostDto(await manager.save(cost));
    });
  }

  async findAll(): Promise<Array<ResponseCostDto>> {
    const costs = await this.qbCost(
      this.repository.createQueryBuilder('cost'),
    ).getMany();
    return costs.map((cost) => new ResponseCostDto(cost));
  }

  async findOne(i016i_costo: number) {
    const cost = await this.qbCost(this.repository.createQueryBuilder('cost'))
      .where('cost.i016i_costo = :id', { id: i016i_costo })
      .getOne();
    if (!cost) throw new NotFoundException();
    return new ResponseCostDto(cost);
  }

  async update(
    i016i_costo: number,
    updateCostDto: UpdateCostDto,
  ): Promise<UpdateCostDto> {
    return this.dataSource.transaction(async (manager) => {
      const existing = await this.qbCost(
        manager.createQueryBuilder(Cost, 'cost'),
      )
        .where('cost.i016i_costo = :id', { id: i016i_costo })
        .getOne();
      if (!existing) throw new NotFoundException();
      await manager.update(Cost, i016i_costo, {
        i016f_i003t_entrada: updateCostDto.i016f_i003t_entrada,
        in_titulo: updateCostDto.in_titulo,
        nu_monto: updateCostDto.nu_monto,
      });
      const cost = await this.qbCost(manager.createQueryBuilder(Cost, 'cost'))
        .where('cost.i016i_costo = :id', { id: i016i_costo })
        .getOne();
      return new ResponseCostDto(cost);
    });
  }

  async remove(i016i_costo: number): Promise<ResponseCostDto> {
    return this.dataSource.transaction(async (manager) => {
      const cost = await this.qbCost(manager.createQueryBuilder(Cost, 'cost'))
        .where('cost.i016i_costo = :id', { id: i016i_costo })
        .getOne();
      if (!cost) throw new NotFoundException();
      await manager.delete(Cost, i016i_costo);
      return new ResponseCostDto(cost);
    });
  }
}

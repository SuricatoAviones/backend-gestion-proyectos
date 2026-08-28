import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ResponseProjectDto } from './dto/response-project.dto';
import { ReportsService } from 'src/reports/reports.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repository: Repository<Project>,
    private dataSource: DataSource,
    private reportsService: ReportsService,
  ) {}

  private qbProjectBase(
    qb: SelectQueryBuilder<Project>,
  ): SelectQueryBuilder<Project> {
    return qb
      .leftJoinAndSelect('project.i003f_i010t_area_tecnica', 'area')
      .leftJoinAndSelect('project.i003f_i011_tipo_proyecto', 'tipo')
      .leftJoinAndSelect('tipo.i011f_i012t_fase_proyecto', 'faseTipo')
      .leftJoinAndSelect('project.i003f_i006t_estado_entrada', 'estado')
      .leftJoinAndSelect('project.i0003f_i008t_equipo_trabajo', 'equipo')
      .leftJoinAndSelect('equipo.c008f_i001t_trabajador', 'tr')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_funcional', 'gf')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_galba', 'gg')
      .leftJoinAndSelect('equipo.c008f_i009t_gerencia_tecnica', 'gt')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_funcional', 'lf')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_negocio', 'ln')
      .leftJoinAndSelect('equipo.c008f_i001t_lider_tecnico', 'lt')
      .leftJoinAndSelect('project.i003f_i005t_fase_entrada', 'faseEntrada')
      .leftJoinAndSelect('project.i003f_i004t_datos_adi', 'datosAdi')
      .leftJoinAndSelect('project.i003f_i013t_tareas', 'tarea')
      .leftJoinAndSelect('tarea.i013f_i014t_seguimiento', 'seg')
      .leftJoinAndSelect('project.i003f_i007i_historia_usuario', 'historia')
      .leftJoinAndSelect('project.i003f_i016i_costo', 'costo');
  }

  private qbProject(
    qb: SelectQueryBuilder<Project>,
  ): SelectQueryBuilder<Project> {
    return this.qbProjectBase(qb).leftJoinAndSelect(
      'seg.i014f_i015t_estado_tarea',
      'estadoTarea',
    );
  }

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<ResponseProjectDto> {
    return this.dataSource.transaction(async (manager) => {
      const project = manager.create(Project, {
        co_entrada: createProjectDto.co_entrada,
        in_titulo: createProjectDto.in_titulo,
        tx_alcance: createProjectDto.tx_alcance,
        tx_objetivo: createProjectDto.tx_objetivo,
        tx_descripcion: createProjectDto.tx_descripcion,
        i003f_i005t_fase_entrada: createProjectDto.i003f_i005t_fase_entrada,
        i003f_i010t_area_tecnica: createProjectDto.i003f_i010t_area_tecnica,
        i003f_i011_tipo_proyecto: createProjectDto.i003f_i011_tipo_proyecto,
        i003f_i006t_estado_entrada: createProjectDto.i003f_i006t_estado_entrada,
        i0003f_i008t_equipo_trabajo:
          createProjectDto.i0003f_i008t_equipo_trabajo,
        i003f_i004t_datos_adi: createProjectDto.i003f_i004t_datos_adi,
        i003f_i013t_tareas: createProjectDto.i003f_i013t_tareas,
        i003f_i007i_historia_usuario:
          createProjectDto.i003f_i007i_historia_usuario,
        i003f_i016i_costo: createProjectDto.i003f_i016i_costo,
        promedio_tareas_plan: createProjectDto.promedio_tareas_plan,
        promedio_tareas_real: createProjectDto.promedio_tareas_real,
      });
      return new ResponseProjectDto(await manager.save(project));
    });
  }

  async findAll(): Promise<Array<ResponseProjectDto>> {
    const data = await this.qbProjectBase(
      this.repository.createQueryBuilder('project'),
    ).getMany();
    return data.map((project) => new ResponseProjectDto(project));
  }

  async findOne(i003i_entrada: number): Promise<ResponseProjectDto> {
    const project = await this.qbProject(
      this.repository.createQueryBuilder('project'),
    )
      .where('project.i003i_entrada = :id', { id: i003i_entrada })
      .getOne();
    if (!project) throw new NotFoundException();
    return new ResponseProjectDto(project);
  }

  async update(
    i003i_entrada: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateProjectDto> {
    return this.dataSource.transaction(async (manager) => {
      const existing = await this.qbProject(
        manager.createQueryBuilder(Project, 'project'),
      )
        .where('project.i003i_entrada = :id', { id: i003i_entrada })
        .getOne();
      if (!existing) throw new NotFoundException();
      await manager.save({
        i003i_entrada,
        co_entrada: updateProjectDto.co_entrada,
        in_titulo: updateProjectDto.in_titulo,
        tx_alcance: updateProjectDto.tx_alcance,
        tx_objetivo: updateProjectDto.tx_objetivo,
        tx_descripcion: updateProjectDto.tx_descripcion,
        i003f_i005t_fase_entrada: updateProjectDto.i003f_i005t_fase_entrada,
        i003f_i010t_area_tecnica: updateProjectDto.i003f_i010t_area_tecnica,
        i003f_i011_tipo_proyecto: updateProjectDto.i003f_i011_tipo_proyecto,
        i003f_i006t_estado_entrada: updateProjectDto.i003f_i006t_estado_entrada,
        i0003f_i008t_equipo_trabajo:
          updateProjectDto.i0003f_i008t_equipo_trabajo,
        i003f_i004t_datos_adi: updateProjectDto.i003f_i004t_datos_adi,
        i003f_i013t_tareas: updateProjectDto.i003f_i013t_tareas,
        i003f_i007i_historia_usuario:
          updateProjectDto.i003f_i007i_historia_usuario,
        i003f_i016i_costo: updateProjectDto.i003f_i016i_costo,
        promedio_tareas_plan: updateProjectDto.promedio_tareas_plan,
        promedio_tareas_real: updateProjectDto.promedio_tareas_real,
      });
      const project = await this.qbProject(
        manager.createQueryBuilder(Project, 'project'),
      )
        .where('project.i003i_entrada = :id', { id: i003i_entrada })
        .getOne();
      return new ResponseProjectDto(project);
    });
  }

  async remove(i003i_entrada: number): Promise<ResponseProjectDto> {
    return this.dataSource.transaction(async (manager) => {
      const project = await this.qbProject(
        manager.createQueryBuilder(Project, 'project'),
      )
        .where('project.i003i_entrada = :id', { id: i003i_entrada })
        .getOne();
      if (!project) throw new NotFoundException();
      await manager.delete(Project, i003i_entrada);
      return new ResponseProjectDto(project);
    });
  }

  async printOne(project_id: number): Promise<any> {
    const project = await this.findOne(project_id);
    return await this.reportsService.singleProject(project);
  }

  async printMany(user_id: number): Promise<any> {
    const projects = await this.qbProject(
      this.repository.createQueryBuilder('project'),
    )
      .where('lf.i001i_usuario = :uid', { uid: user_id })
      .orWhere('ln.i001i_usuario = :uid', { uid: user_id })
      .orWhere('lt.i001i_usuario = :uid', { uid: user_id })
      .getMany();
    return this.reportsService.manyProjects(projects);
  }
}

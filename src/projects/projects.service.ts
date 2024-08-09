import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseProjectDto } from './dto/response-project.dto';
import { Project } from './entities/project.entity';
import { ReportsService } from 'src/reports/reports.service';
@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project)
  private repository: Repository<Project>,
    private reportsService: ReportsService) {

  }

  async create(createProjectDto: CreateProjectDto): Promise<ResponseProjectDto> {
    try {
      const project = this.repository.create({
        co_entrada: createProjectDto.co_entrada,
        in_titulo: createProjectDto.in_titulo,
        tx_alcance: createProjectDto.tx_alcance,
        tx_objetivo: createProjectDto.tx_objetivo,
        tx_descripcion: createProjectDto.tx_descripcion,
        i003f_i005t_fase_entrada: createProjectDto.i003f_i005t_fase_entrada,
        i003f_i010t_area_tecnica: createProjectDto.i003f_i010t_area_tecnica,
        i003f_i011_tipo_proyecto: createProjectDto.i003f_i011_tipo_proyecto,
        i003f_i006t_estado_entrada: createProjectDto.i003f_i006t_estado_entrada,
        i0003f_i008t_equipo_trabajo: createProjectDto.i0003f_i008t_equipo_trabajo,
        i003f_i004t_datos_adi: createProjectDto.i003f_i004t_datos_adi,
        i003f_i013t_tareas : createProjectDto.i003f_i013t_tareas,
        i003f_i007i_historia_usuario : createProjectDto.i003f_i007i_historia_usuario ,
        i003f_i016i_costo : createProjectDto.i003f_i016i_costo,
       /*  promedio_tareas_plan: createProjectDto.promedio_tareas_plan,
        promedio_tareas_real: createProjectDto.promedio_tareas_real */
      })
      return new ResponseProjectDto(await this.repository.save(project))
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error)

    }
  }

  async findAll(/* @Query() query */): Promise<Array<ResponseProjectDto>> {
    try {
      const data = await this.repository.find({
        relations: {
          i003f_i010t_area_tecnica: true,
          i003f_i011_tipo_proyecto: {
            i011f_i012t_fase_proyecto: true
          },
          i003f_i006t_estado_entrada: true,
          i0003f_i008t_equipo_trabajo: {
            c008f_i001t_trabajador: true,
            c008f_i009t_gerencia_funcional: true,
            c008f_i009t_gerencia_galba: true,
            c008f_i009t_gerencia_tecnica: true,
            c008f_i001t_lider_funcional: true,
            c008f_i001t_lider_negocio: true,
            c008f_i001t_lider_tecnico: true,
          },
          i003f_i005t_fase_entrada: true,
          i003f_i004t_datos_adi: true,
          i003f_i013t_tareas: {
            i013f_i014t_seguimiento: true,
          }, 
          i003f_i007i_historia_usuario: true,
          i003f_i016i_costo:true
        }
      });
      return data.map(project => new ResponseProjectDto(project))
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error)

    }
  }

  async findOne(i003i_entrada: number, /* @Query() query */): Promise<ResponseProjectDto> {
    try {
      const project = await this.repository.findOne({
        where: {
          i003i_entrada,
        },
        relations: {
          i003f_i010t_area_tecnica: true,
          i003f_i011_tipo_proyecto: {
            i011f_i012t_fase_proyecto: true
          },
          i003f_i006t_estado_entrada: true,
          i0003f_i008t_equipo_trabajo: {
            c008f_i001t_trabajador: true,
            c008f_i009t_gerencia_funcional: true,
            c008f_i009t_gerencia_galba: true,
            c008f_i009t_gerencia_tecnica: true,
            c008f_i001t_lider_funcional: true,
            c008f_i001t_lider_negocio: true,
            c008f_i001t_lider_tecnico: true,
          },
          i003f_i005t_fase_entrada: true,
          i003f_i004t_datos_adi: true,
          i003f_i013t_tareas:  {
            i013f_i014t_seguimiento: {
              i014f_i015t_estado_tarea: true
            },
          },
          i003f_i007i_historia_usuario: true,
          i003f_i016i_costo:true
        },
      });
      if (!project) throw new NotFoundException();
      return new ResponseProjectDto(project)
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error)

    }
  }

  async update(i003i_entrada: number, updateProjectDto: UpdateProjectDto): Promise<UpdateProjectDto> {
    try {
      await this.findOne(i003i_entrada);
      const project = await this.repository.save({
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
        i0003f_i008t_equipo_trabajo: updateProjectDto.i0003f_i008t_equipo_trabajo,
        i003f_i004t_datos_adi: updateProjectDto.i003f_i004t_datos_adi,
        i003f_i013t_tareas : updateProjectDto.i003f_i013t_tareas,
        i003f_i007i_historia_usuario : updateProjectDto.i003f_i007i_historia_usuario ,
        i003f_i016i_costo : updateProjectDto.i003f_i016i_costo,
        /* promedio_tareas_plan: updateProjectDto.promedio_tareas_plan,
        promedio_tareas_real: updateProjectDto.promedio_tareas_real */
      })
      return this.findOne(i003i_entrada)
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error)

    }
  }

  async remove(i003i_entrada: number): Promise<ResponseProjectDto> {
    try {
      const project = await this.findOne(i003i_entrada);
      await this.repository.delete(i003i_entrada);
      return new ResponseProjectDto(project)
    } catch (error) {
      throw new BadRequestException(error)

    }
  }

  async printOne(project_id: number): Promise<any> {
    const project = await this.findOne(project_id);
    return await this.reportsService.singleProject(project)
  }

  async printMany(user_id: number): Promise<any> {
    const projects = await this.repository.find({
      where: {
        i0003f_i008t_equipo_trabajo: [
          {
            c008f_i001t_lider_funcional: {
              i001i_usuario: user_id
            }
          },
        {
          c008f_i001t_lider_negocio: {
            i001i_usuario: user_id,
          }
        },
        {
          c008f_i001t_lider_tecnico: {
            i001i_usuario: user_id
          },
        }
      ]
      },
      relations: {
        i003f_i010t_area_tecnica: true,
        i003f_i011_tipo_proyecto: {
          i011f_i012t_fase_proyecto: true
        },
        i003f_i006t_estado_entrada: true,
        i0003f_i008t_equipo_trabajo: {
          c008f_i001t_trabajador: true,
          c008f_i009t_gerencia_funcional: true,
          c008f_i009t_gerencia_galba: true,
          c008f_i009t_gerencia_tecnica: true,
          c008f_i001t_lider_funcional: true,
          c008f_i001t_lider_negocio: true,
          c008f_i001t_lider_tecnico: true,
        },
        i003f_i005t_fase_entrada: true,
        i003f_i004t_datos_adi: true,
        i003f_i013t_tareas:  {
          i013f_i014t_seguimiento: {
            i014f_i015t_estado_tarea: true
          },
        },
        i003f_i007i_historia_usuario: true,
        i003f_i016i_costo:true
      },
    })
    return this.reportsService.manyProjects(projects)
  }
}

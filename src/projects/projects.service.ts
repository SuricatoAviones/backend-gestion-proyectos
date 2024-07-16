import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseProjectDto } from './dto/response-project.dto';
import { Project } from './entities/project.entity';
@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project)
  private repository: Repository<Project>) {

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
        i004i_datos_adi: createProjectDto.i004i_datos_adi,
      })
      return new ResponseProjectDto(await this.repository.save(project))
    } catch (error) {
           throw new BadRequestException(error)

    }
  }

  async findAll(): Promise<Array<ResponseProjectDto>> {
    try {
      const data = await this.repository.find({
        relations: {
          i003f_i010t_area_tecnica: true,
          i003f_i011_tipo_proyecto: {
            i011f_i012t_fase_proyecto: true
          },
          i003f_i006t_estado_entrada: true,
          i0003f_i008t_equipo_trabajo: true, // wtf
          i003f_i005t_fase_entrada: true,
          i004i_datos_adi: true,
        }
      });
      return data.map(project => new ResponseProjectDto(project))
    } catch (error) {
           console.log(error);
           throw new BadRequestException(error)

    }
  }

  async findOne(i003i_entrada: number): Promise<ResponseProjectDto> {
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
          i0003f_i008t_equipo_trabajo: true, // wtf
          i003f_i005t_fase_entrada: true,
          i004i_datos_adi: true,
        }
      });
      if (!Project) throw new NotFoundException();
      return new ResponseProjectDto(project)
    } catch (error) {
           console.log(error)
           throw new BadRequestException(error)

    }
  }

  async update(i003i_entrada: number, updateProjectDto: UpdateProjectDto): Promise<UpdateProjectDto> {
    try {
      const project = await this.repository.update(i003i_entrada, {
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
        i004i_datos_adi: updateProjectDto.i004i_datos_adi,
      })
      return this.findOne(i003i_entrada)
    } catch (error) {
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
}

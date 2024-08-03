import { User } from "../entities/user.entity";

export class ResponseUserDto {
    i001i_usuario: number;
    in_usuario: string;
    in_nombre: string;
    in_apellido: string;
    in_correo: string;
    in_role: string;
    password: string;
    foto: string;
    deletedAt: Date;
    createdAt: Date;

    constructor (data: User) {
      this.i001i_usuario = data.i001i_usuario;
      this.in_usuario = data.in_usuario;
      this.in_nombre = data.in_nombre;
      this.in_apellido = data.in_apellido;
      this.in_correo = data.in_correo;
      this.in_role = data.in_role;
      this.password = data.password;
      this.foto = data.foto;
      this.deletedAt = data.deletedAt;
      this.createdAt = data.createdAt;

    }
}
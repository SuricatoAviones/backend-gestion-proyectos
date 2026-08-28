import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'i004t_datos_adi' })
export class AdditionalDatum {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  i004i_datos_adi: number;

  @ApiProperty()
  @Column({ length: 2000, nullable: true })
  tx_interfaz: string;

  @ApiProperty()
  @Column({ length: 2000, nullable: true })
  tx_interconexion: string;

  @ApiProperty()
  @Column({ nullable: true })
  tx_datamodelo: string;

  @ApiProperty()
  @Column({ length: 2000, nullable: true })
  tx_seguridad: string;

  @ApiProperty()
  @Column({ length: 2000, nullable: true })
  tx_comentario: string;
}

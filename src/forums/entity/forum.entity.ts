import { ApiProperty } from "@nestjs/swagger";
import { Message } from "src/messages/entity/message.entity";
import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";


@Entity({ name: 'i018t_foro' })
export class Forum {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    i018t_foro: number;

    @ApiProperty()
    @OneToOne(() => Project, (project) => project.i003i_entrada)
    @JoinColumn()
    i018f_i003t_entrada: Project;

    @ManyToOne(() => Message, (message) => message.i018f_i019t_foro, {
        nullable: false,
        cascade: true,
    })
    @ApiProperty()
    @JoinColumn()
    i018f_i019t_mensaje!: Message[];
}

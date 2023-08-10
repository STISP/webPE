import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Unique(['email'])
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 255, nullable: false })
    email: string;

    @Column({ nullable: false })
    senha: string;
}
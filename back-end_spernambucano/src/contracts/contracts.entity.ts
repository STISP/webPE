import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    startDate: Date;

    @Column()
    dueDate: Date;

    @Column()
    value: number;

    @Column()
    status: string;
}

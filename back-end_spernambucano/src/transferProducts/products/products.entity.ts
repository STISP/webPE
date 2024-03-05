import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Products {
    // id do produto 
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    // codigo do produto
    @Column({ type: 'text' })
    productCode: string;

    // nome do produto
    @Column({ type: 'text' })
    productName: string;

    // quantidade do produto
    @Column({ type: 'integer' })
    productQuantity: number;
}
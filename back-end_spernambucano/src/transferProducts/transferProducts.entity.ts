import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class TransferProducts {
    // id da transferencia 
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    // nome do produto
    @Column({ type: 'text' })
    productName: string;

    @Column({ type: 'text' })
    productCode: string;

    // valor do produto
    @Column({ type: 'float' })
    productValue: number;

    // quantidade do produto
    @Column({ type: 'integer' })
    productQuantity: number;

    // dia postado
    @Column()
    postDate: Date;

    // data da transferencia
    @Column()
    transferDate: Date;

    // data de entrega
    // é a data de entrega que vai dizer o status da transferencia (Entregue, Pendente)
    // se a data for igual a 01/01/9999, a transferencia ainda ta pendente e se for diferente, a transferencia ja foi entregue 
    @Column()
    deliveryDate: Date;

    // loja de origem
    @Column({ type: 'text' })
    originStore: string;

    // loja de destino
    @Column({ type: 'text' })
    destinationStore: string;

    // nome de quem postou
    @Column({ type: 'text' })
    postedBy: string;
    value: number;
}
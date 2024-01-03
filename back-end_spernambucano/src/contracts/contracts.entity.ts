import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Contract {
    // id do contrato
    @PrimaryGeneratedColumn()
    id: number;

    // nome do contrato
    @Column({ type: 'text' })
    clientName: string;

    // numero do contrato
    @Column({ type: 'text' })
    contractNumber: string;

    // data de início do contrato
    @Column({ type: 'date' })
    startDate: Date;

    // data de término do contrato
    @Column({ type: 'date' })
    endDate: Date;

    // valor do contrato
    @Column({ type: 'float' })
    contractValue: number;

    // status do contrato
    @Column({ type: 'text' })
    status: string;

    // descrição do contrato
    @Column({ type: 'text' })
    contractDescription: string;

    // termos de pagamento do contrato
    @Column({ type: 'text' })
    paymentTerms: string;

    // detalhes do produto do contrato
    @Column({ type: 'text' })
    productDetails: string;

    // condições de contrato
    @Column({ type: 'text' })
    terminationConditions: string;

    @Column({ type: 'text' })
    postedBy: string;

    @Column({ type: 'date' })
    postedDate: Date;

    @Column({ type: 'text' })
    loja: string;

    // contrato de renovação
    //@OneToOne(() => Contract)
    //@JoinColumn()
    //renewalContract: Contract;
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Contract {
    // id do contrato 
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    // nome do contrato
    @Column({ type: 'text' })
    clientName: string;

    // numero do contrato
    @Column({ type: 'text' })
    contractNumber: string;

    // data de início do contrato
    @Column()
    startDate: Date;

    // data de término do contrato
    @Column()
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

    @Column({ type: 'text' })
    postedBy: string;

    @Column()
    postedDate: Date;

    @Column({ type: 'text' })
    loja: string;

    @Column({ type: 'text' })
    companyPhone: string;

    @Column({ type: 'text' })
    companyEmail: string;

    @Column({ type: 'text' })
    companyName: string;

    @Column({ type: 'text' })
    companyFantasyName: string;

    @Column({ type: 'text' })
    companyCNPJ: string;

    // contrato de renovação
    //@OneToOne(() => Contract)
    //@JoinColumn()
    //renewalContract: Contract;
}
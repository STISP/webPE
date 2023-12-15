import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
@Entity()
export class Contract {
    // id do contrato
    @PrimaryGeneratedColumn()
    id: number;

    // nome do contrato
    @Column()
    clientName: string;

    // numero do contrato
    @Column()
    contractNumber: string;

    // data de início do contrato
    @Column()
    startDate: Date;

    // data de término do contrato
    //@Column()
    //endDate: Date;

    // valor do contrato
    @Column()
    contractValue: number;

    // status do contrato
    @Column()
    status: string;

    // descrição do contrato
    @Column()
    contractDescription: string;

    // termos de pagamento do contrato
    @Column()
    paymentTerms: string;

    // cláusulas especiais do contrato
    @Column()
    specialClauses: string;

    // informações de contato do contrato 
    // endereco do contrato
    @Column()
    address: string;

    // telefone do contrato
    @Column()
    phone: string;

    // email do contrato
    @Column()
    email: string;

    // detalhes do produto do contrato
    @Column()
    productDetails: string;

    // condições de contrato
    @Column()
    terminationConditions: string;

    // representante do supermercado
    @Column()
    supermarketRep: string;

    // testemunhas do contrato
    @Column()
    witnesses: string;

    // id do supermercado
    //@Column()
    //supermarketId: number;

    // contrato de renovação
    //@OneToOne(() => Contract)
    //@JoinColumn()
    //renewalContract: Contract;

    //// usuario que criou o contrato
    //@Column()
    //createdBy: string;
}
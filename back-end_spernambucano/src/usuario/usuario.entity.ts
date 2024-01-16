import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

@Entity()
@Unique(['email'])
export class Usuario {
    // @PrimaryGeneratedColumn('uuid')
    // id: string = uuidv4();

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 255, nullable: false })
    email: string;

    @Column({ nullable: false })
    senha: string;

    // @Column({ default: false })
    // cadastroNovoUsuario: boolean;

    // @Column({ default: false })
    // acessoContratos: boolean;

    // @Column({ default: false })
    // acessoAdicionarContratos: boolean;

    // @Column({ default: false })
    // acessoDeletarContratos: boolean;

    // @Column({ default: false })
    // acessoEditarContratos: boolean;

    // @Column({ default: false })
    // acessoUsuarios: boolean;

    // @Column({ default: false })
    // acessoAdicionarUsuarios: boolean;

    // @Column({ default: false })
    // acessoDeletarUsuarios: boolean;

    // @Column({ default: false })
    // acessoEditarUsuarios: boolean;
}
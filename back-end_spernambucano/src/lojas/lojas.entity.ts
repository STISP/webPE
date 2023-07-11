import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lojas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  loja: string;

  @Column({ length: 200 })
  LojaEndereco: string;

  @Column({ length: 100 })
  LojaTelefone: string;

  @Column({ length: 100 })
  LojaEmail: string;

  @Column({ length: 100 })
  CEP: string;

  @Column({ length: 100 })
  LojaHorario: string;

  @Column({ length: 20 })
  cnpj: string;

  @Column({ length: 10 })
  SegundaASextaI: string;

  @Column({ length: 10 })
  SegundaASextaF: string;

  @Column({ length: 10 })
  SabadoI: string;

  @Column({ length: 10 })
  SabadoF: string;

  @Column({ length: 10 })
  DomingoI: string;

  @Column({ length: 10 })
  DomingoF: string;

  @Column()
  mapaLojaURL: string;
}

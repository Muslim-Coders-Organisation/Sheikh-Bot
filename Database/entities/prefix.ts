import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Prefixes {

  @PrimaryColumn('varchar', { length: 18 })
  guildIdentifier!: string;

  @Column('varchar', { length: 255 })
  prefix!: string;

}


import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Schedules {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 18 })
    guildIdentifier!: string;

    @Column('varchar', { length: 18 })
    channelIdentifier!: string;

    @Column('varchar', { length: 20 })
    scheduleName!: string;

    @Column("varchar", { length: 255 })
    interval!: string; // This is in minutes (4h -> 240, 1d -> 1440, 1w -> 10080, these will be automatically converted e.t.c.)

    @Column('varchar', { length: 2000 }) 
    message!: string;

    @Column('boolean') 
    enabled!: boolean;

    

}
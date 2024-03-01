import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Region {
    ALTO_TIETE = 'Alto Tietê',
    INTERIOR = 'Interior',
    ES = 'ES',
    SP_INTERIOR = 'SP Interior',
    SP = 'SP',
    SP2 = 'SP2',
    MG = 'MG',
    NACIONAL = 'Nacional',
    SP_CAV = 'SP CAV',
    RJ = 'RJ',
    SP2_AGAIN = 'SP2',
    SP1 = 'SP1',
    NE1 = 'NE1',
    NE2 = 'NE2',
    SUL = 'SUL',
    NORTE = 'Norte',
}

@Entity()
export class ClinicModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    businessName: string;

    @Column()
    tradeName: string;

    @Column()
    cnpj: string;

    @Column({
        type: 'text',
        enum: Region,
    })
    region: string;

    @Column('simple-array') // TypeORM annotation for a simple array
    medicalSpecialties: string[];

    @Column({ type: 'date' })
    inaugurationDate: Date;

    @Column({ default: true })
    isActive: boolean;
}

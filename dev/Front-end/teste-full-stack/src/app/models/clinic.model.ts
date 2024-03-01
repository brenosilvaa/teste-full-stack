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

export class Clinic {
    id: number;
    businessName: string;
    tradeName: string;
    cnpj: string;
    region: Region;
    medicalSpecialties: string[];
    inaugurationDate: Date
    isActive: boolean;
}
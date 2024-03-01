import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsArray, ArrayMinSize, MaxLength, Matches, IsDate } from 'class-validator';

export class ClinicSchema {

    @IsString({ message: 'Razão Social é obrigatória' })
    @IsNotEmpty({ message: 'Razão Social não pode estar vazia' })
    businessName: string;

    @IsString({ message: 'Nome Fantasia é obrigatório' })
    @IsNotEmpty({ message: 'Nome Fantasia não pode estar vazio' })
    tradeName: string;

    @IsString({ message: 'CNPJ é obrigatório' })
    @IsNotEmpty({ message: 'CNPJ não pode estar vazio' })
    @MaxLength(14, { message: 'CNPJ deve ter no máximo 14 caracteres' })
    @Matches(/^\d{14}$/)
    cnpj: string;

    @IsString({ message: 'Regional é obrigatória' })
    @IsNotEmpty({ message: 'Regional não pode estar vazia' })
    region: string;

    @IsArray({ message: 'Especialidades Médicas são obrigatórias' })
    @ArrayMinSize(5, { message: 'Pelo menos 5 especialidades médicas devem ser selecionadas' })
    medicalSpecialties: string[];

    @Type(() => Date)
    @IsDate({ message: 'Data de Inauguração é obrigatória' })
    @IsNotEmpty({ message: 'Data de Inauguração não pode estar vazia' })
    inaugurationDate: string;

    @IsBoolean({ message: 'Ativa é obrigatória' })
    @IsNotEmpty({ message: 'Ativa não pode estar vazia' })
    isActive: boolean;


}

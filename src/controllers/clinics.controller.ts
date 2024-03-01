import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicModel } from "src/models/clinic.model"
import { ClinicSchema } from "src/schemas/clinic.schema";
import { Repository } from 'typeorm';

@Controller('/clinics')
export class ClinicsController {
    constructor(@InjectRepository(ClinicModel) private model: Repository<ClinicModel>) { }

    @Post()
    public async create(@Body() body: ClinicSchema): Promise<ClinicModel> {
        console.log(body);
        return await this.model.save(body);

    }


    @Get(':id')
    public async find(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ClinicModel> {
        const clinic = await this.model.findOne({ where: { id } });

        if (!clinic) {
            throw new NotFoundException(`Não achei uma clínica com o id ${id}`);
        }

        return clinic;
    }

    @Get()
    public async list(): Promise<ClinicModel[]> {
        return await this.model.find();
    }

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: ClinicSchema,
    ): Promise<ClinicModel> {
        const clinic = await this.model.findOne({ where: { id } });

        if (!clinic) {
            throw new NotFoundException(`Não encontrei uma clínica com o id ${id}`);
        }

        await this.model.update({ id }, body);

        return this.model.findOne({ where: { id } });
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const clinic = await this.model.findOne({ where: { id } });

        if (!clinic) {
            throw new NotFoundException(`Não encontrei uma clínica com o id ${id}`);
        }

        await this.model.delete(id);

        return `A clínica com id ${id} foi deletada com sucesso`;
    }

}
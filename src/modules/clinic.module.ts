import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClinicsController } from "src/controllers/clinics.controller";
import { ClinicModel } from "src/models/clinic.model";

@Module({
    imports: [TypeOrmModule.forFeature([ClinicModel])],
    controllers: [ClinicsController]
})
export class ClinicModule {

}
import { Module } from '@nestjs/common';
import { ClinicModule } from './modules/clinic.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ClinicModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sql',
    synchronize: true,
    entities: ["dist/**/*.model.js"],
  })],
})
export class AppModule { }

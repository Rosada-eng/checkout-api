import { Module } from '@nestjs/common';
import { CompanyUseCases } from './useCases/company.usecase';
import { CompaniesController } from './controllers/companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/typeorm/company.entity';
import { CompanyRepository } from './repositories/typeorm/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompanyRepository, CompanyUseCases],
  exports: [CompanyUseCases, TypeOrmModule],
})
export class CompaniesModule {}

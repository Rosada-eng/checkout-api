import { Injectable } from '@nestjs/common';
import { ICompanyUseCases } from "../useCases/company.usecase.d";
import { CompanyRepository } from '../repositories/typeorm/company.repository';
import { CreateOneCompanyDTO } from '../dto/createOneCompany.dto';
import { FindOneCompanyByTaxIdDTO } from '../dto/findOneCompanyByTaxId.dto';
import { Company } from '../entities/typeorm/company.entity';

@Injectable()
export class CompanyUseCases implements ICompanyUseCases {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) { }

    async createOneCompany(createOneCompanyDTO: CreateOneCompanyDTO): Promise<Company> {
        return await this.companyRepository.createOneCompany(createOneCompanyDTO)
    }

    async findOneCompanyByTaxId({ taxId }: FindOneCompanyByTaxIdDTO): Promise<Company | null> {
        return await this.companyRepository.findOneCompanyByTaxId({ taxId })
    }

    async findAllCompanies(): Promise<Company[]> {
        return await this.companyRepository.findAllCompanies()
    }
  
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICompanyRepository } from "../company.repository.d";
import { Repository } from "typeorm";
import { Company } from "src/companies/entities/typeorm/company.entity";
import { CreateOneCompanyDTO } from "src/companies/dto/createOneCompany.dto";
import { FindOneCompanyByTaxIdDTO } from "src/companies/dto/findOneCompanyByTaxId.dto";

@Injectable()
export class CompanyRepository implements ICompanyRepository {

    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
    ) { }

    async createOneCompany(createOneCompanyDTO: CreateOneCompanyDTO): Promise<Company> {
        const company = this.companyRepository.create(createOneCompanyDTO)

        await this.companyRepository.save(company)

        return company;
    }

    async findOneCompanyByTaxId({ taxId }: FindOneCompanyByTaxIdDTO): Promise<Company | null> {
        
        return await this.companyRepository.findOne({
            where: {
                taxId
            }
        })
    }

    async findAllCompanies(): Promise<Company[]> {
        return await this.companyRepository.find()
    }
}
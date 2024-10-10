import { ICompany } from "../entities/company.model";
import { ICreateOneCompanyDTO } from "../dto/createOneCompany.dto.d";
import { IFindOneCompanyByTaxIdDTO } from "../dto/findOneCompanyByTaxId.dto.d";

export interface ICompanyUseCases {
    createOneCompany(createOneCompanyDTO: ICreateOneCompanyDTO): Promise<ICompany>

    findOneCompanyByTaxId(findOneCompanyByTaxIdDTO: IFindOneCompanyByTaxIdDTO): Promise<ICompany | null>

    findAllCompanies(): Promise<ICompany[]>
}
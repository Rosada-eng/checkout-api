import { IFindOneCompanyByTaxIdDTO } from "../dto/findOneCompanyByTaxId.dto"

export interface ICompanyRepository {

    createOneCompany(createOneCompanyDTO: ICreateOneCompanyDTO): Promise<ICompany>

    findOneCompanyByTaxId(findOneCompanyByTaxIdDTO: IFindOneCompanyByTaxIdDTO): Promise<ICompany | null>

    findAllCompanies(): Promise<ICompany[]>
}
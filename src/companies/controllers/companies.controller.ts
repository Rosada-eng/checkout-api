import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyUseCases } from '../useCases/company.usecase';
import { ApiTags } from '@nestjs/swagger';
import { CreateOneCompanyDTO } from '../dto/createOneCompany.dto';
import { FindOneCompanyByTaxIdDTO } from '../dto/findOneCompanyByTaxId.dto';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompanyUseCases) {}

  @Post()
  async create(@Body() createCompanyDTO: CreateOneCompanyDTO) {
    return await this.companiesService.createOneCompany(createCompanyDTO);
  }

  @Get()
  async findAll() {
    return await this.companiesService.findAllCompanies();
  }

  @Get(':taxId')
  async findOne(@Param('taxId') taxId: FindOneCompanyByTaxIdDTO) {
    return await this.companiesService.findOneCompanyByTaxId(taxId);
  }

  
}

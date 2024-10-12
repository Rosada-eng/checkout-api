import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/typeorm/company.entity';

@Injectable()
export class CompaniesSeedService {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  async run() {
    try {
      const numOfCompanies = await this.repository.findAndCount();
      const hasCompanies = numOfCompanies[1] > 0;

      if (hasCompanies) {
        console.log('Companies already seeded');
        return;
      }

      const companies: Partial<Company>[] = [
            {
                taxId: '26900161000125',
                legalName: 'Buyer Co. Ltda.',
                businessName: 'Buyer Co.',
            },
            {
                taxId: '37154724000108',
                legalName: 'Seller Co. Ltda.',
                businessName: 'Seller Co.',
            },
      ];

      // Inserindo os produtos no banco de dados
      await this.repository.save(companies);

      console.log('Companies cadastrados com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar companies:', error);
    }
  }
}
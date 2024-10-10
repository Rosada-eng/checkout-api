import { Test, TestingModule } from '@nestjs/testing';
import { CompanyUseCases } from './company.usecase';

describe('CompaniesService', () => {
  let service: CompanyUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyUseCases],
    }).compile();

    service = module.get<CompanyUseCases>(CompanyUseCases);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductUseCases } from './product.usecase';

describe('ProductsService', () => {
  let service: ProductUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductUseCases],
    }).compile();

    service = module.get<ProductUseCases>(ProductUseCases);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

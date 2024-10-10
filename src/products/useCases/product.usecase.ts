import { Injectable } from '@nestjs/common';
import { IProductUseCases } from './product.usecase.d';
import { IProduct } from '../entities/product.model.d';
import { ICreateOneProductDTO } from '../dto/createOneProduct.dto.d';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductUseCases implements IProductUseCases{

  constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  async createOneProduct(createOneProductDTO: ICreateOneProductDTO): Promise<string> {
    return await this.productRepository.createOne(createOneProductDTO);

  }
  async getOneProduct(productId: string): Promise<IProduct | null> {
    return await this.productRepository.findOneById(productId);
  }
  async getAllProducts(): Promise<IProduct[]> {
    return await this.productRepository.findAll();
  }

}

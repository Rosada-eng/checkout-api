import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductUseCases } from '../useCases/product.usecase';
import { ICreateOneProductDTO } from '../dto/createOneProduct.dto.d';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductUseCases) {}

  @Post()
  async createOneProduct(@Body() createOneProductDTO: ICreateOneProductDTO) {
    return await this.productsService.createOneProduct(createOneProductDTO);
  }

  @Get(':id')
  async getOneProduct(@Param('id') productId: string) {
    return await this.productsService.getOneProduct(productId);
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }
}

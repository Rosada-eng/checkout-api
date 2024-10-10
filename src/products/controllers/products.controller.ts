import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductUseCases } from '../useCases/product.usecase';
import { CreateOneProductDTO } from '../dto/createOneProduct.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsUseCases: ProductUseCases) {}

  @Post()
  async createOneProduct(@Body() createOneProductDTO: CreateOneProductDTO) {
    return await this.productsUseCases.createOneProduct(createOneProductDTO);
  }

  @Get(':id')
  async getOneProduct(@Param('id') productId: string) {
    return await this.productsUseCases.getOneProduct(productId);
  }

  @Get()
  async getAllProducts() {
    return await this.productsUseCases.getAllProducts();
  }
}

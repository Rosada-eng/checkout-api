import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductUseCases } from '../useCases/product.usecase';
import { CreateOneProductDTO } from '../dto/createOneProduct.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductUseCases) {}

  @Post()
  async createOneProduct(@Body() createOneProductDTO: CreateOneProductDTO) {
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

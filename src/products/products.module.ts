import { Module } from '@nestjs/common';
import { ProductUseCases } from './useCases/product.usecase';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/typeorm/product.entity';
import { ProductRepository } from './repositories/typeorm/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductRepository, ProductUseCases],
  exports: [ProductUseCases, TypeOrmModule],
})
export class ProductsModule {}

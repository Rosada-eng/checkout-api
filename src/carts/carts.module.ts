import { Module } from '@nestjs/common';
import { CartUseCases } from './useCases/cart.usecase';
import { CartsController } from './controllers/carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/typeorm/cart.entity';
import { CartProducts } from './entities/typeorm/cartProducts.entity';
import { CartRepository } from './repositories/typeorm/cart.repository';
import { ProductsModule } from 'src/products/products.module';
import { ProductRepository } from 'src/products/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    Cart,
    CartProducts
  ]),
  ProductsModule
],
  controllers: [CartsController],
  providers: [CartRepository, ProductRepository, CartUseCases],
  exports: [CartUseCases, TypeOrmModule],
})
export class CartsModule {}

import { Module } from '@nestjs/common';
import { CartUseCases } from './useCases/cart.usecase';
import { CartsController } from './controllers/carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/typeorm/cart.entity';
import { CartProducts } from './entities/typeorm/cartProducts.entity';
import { CartRepository } from './repositories/typeorm/cart.repository';
import { ProductsModule } from 'src/products/products.module';
import { ProductRepository } from 'src/products/repositories/typeorm/product.repository';
import { CompaniesModule } from 'src/companies/companies.module';
import { CompanyRepository } from 'src/companies/repositories/typeorm/company.repository';
import { OrdersModule } from 'src/orders/orders.module';
import { OrderRepository } from 'src/orders/repositories/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      CartProducts
    ]),
    ProductsModule,
    CompaniesModule,
    OrdersModule
],
  controllers: [CartsController],
  providers: [
    CartRepository, 
    ProductRepository, 
    CompanyRepository, 
    OrderRepository,
    CartUseCases
],
  exports: [CartUseCases, TypeOrmModule],
})
export class CartsModule {}

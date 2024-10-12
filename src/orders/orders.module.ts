import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrderUseCases } from './useCases/order.usecase';
import { Order } from './entities/typeorm/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';
import { CartsModule } from 'src/carts/carts.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { CartRepository } from 'src/carts/repositories/typeorm/cart.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
      Order
    ]),
    forwardRef(() => CartsModule),
    CompaniesModule
  ],
  controllers: [OrdersController],
  providers: [OrderRepository , OrderUseCases, CartRepository],
  exports: [OrderUseCases, TypeOrmModule],
})
export class OrdersModule {}

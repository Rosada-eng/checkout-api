import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { CartsModule } from './carts/carts.module';
import { TypeOrmConfigModule } from './@infrastructure/typeorm/typeorm.module';

@Module({
  imports: [
    TypeOrmConfigModule, 
    ProductsModule, 
    CompaniesModule, 
    CartsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

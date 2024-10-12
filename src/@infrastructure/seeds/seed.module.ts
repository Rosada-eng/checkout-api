import { Module } from '@nestjs/common';
import { ProductSeedModule } from './products/product.seed.module';
import { TypeOrmConfigModule } from '../typeorm/typeorm.module';
import { CompaniesSeedModule } from './companies/company.seed.module';

@Module({
  imports: [
    ProductSeedModule,
    CompaniesSeedModule,
    TypeOrmConfigModule
],
})
export class SeedModule { }
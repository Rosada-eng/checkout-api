import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "src/companies/entities/typeorm/company.entity";
import { Product } from "src/products/entities/typeorm/product.entity";
import { CompaniesSeedService } from "./company.seed";

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    providers: [CompaniesSeedService],
  })
  export class CompaniesSeedModule {}
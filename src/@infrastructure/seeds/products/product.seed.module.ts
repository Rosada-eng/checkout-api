import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entities/typeorm/product.entity";
import { ProductSeedService } from "./product.seed";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductSeedService],
  })
  export class ProductSeedModule {}
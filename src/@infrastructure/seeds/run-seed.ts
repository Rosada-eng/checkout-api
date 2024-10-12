import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { ProductSeedService } from './products/product.seed';
import { CompaniesSeedService } from './companies/company.seed';


async function bootstrap() {
    const app = await NestFactory.create(SeedModule);
    const productSeedService = app.get(ProductSeedService);
    const companySeedService = app.get(CompaniesSeedService);
    await productSeedService.run();
    await companySeedService.run();
    await app.listen(3000);
  }
  bootstrap();
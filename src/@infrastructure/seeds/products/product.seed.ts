import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/typeorm/product.entity';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async run() {
    try {
      const numOfProducts = await this.repository.findAndCount();
      const hasProducts = numOfProducts[1] > 0;

      if (hasProducts) {
        console.log('Products already seeded');
        return;
      }

      const products: Partial<Product>[] = [
        {
            name: 'Dog Food - Premium',
            unitPriceCents: 2500,
            imageUrl: 'https://example.com/dog_food_premium.jpg',
        },
        {
            name: 'Cat Litter - Scented',
            unitPriceCents: 1200,
            imageUrl: 'https://example.com/cat_litter.jpg',
        },
        {
            name: 'Bird Cage - Medium',
            unitPriceCents: 5500,
            imageUrl: 'https://example.com/bird_cage_medium.jpg',
        },
        {
            name: 'Dog Leash - Nylon',
            unitPriceCents: 1800,
            imageUrl: 'https://example.com/dog_leash.jpg',
        },
        {
            name: 'Cat Scratching Post',
            unitPriceCents: 3200,
            imageUrl: 'https://example.com/cat_scratching_post.jpg',
        },
        {
            name: 'Fish Tank - 20 Gallons',
            unitPriceCents: 12500,
            imageUrl: 'https://example.com/fish_tank.jpg',
        },
        {
            name: 'Hamster Wheel - Small',
            unitPriceCents: 900,
            imageUrl: 'https://example.com/hamster_wheel.jpg',
        },
        {
            name: 'Dog Bed - Large',
            unitPriceCents: 4500,
            imageUrl: 'https://example.com/dog_bed_large.jpg',
        },
        {
            name: 'Reptile Heat Lamp',
            unitPriceCents: 3000,
            imageUrl: 'https://example.com/reptile_heat_lamp.jpg',
        },
        {
            name: 'Bird Seed Mix - 1kg',
            unitPriceCents: 700,
            imageUrl: 'https://example.com/bird_seed_mix.jpg',
        },
      ];

      // Inserindo os produtos no banco de dados
      await this.repository.save(products);

      console.log('Products cadastrados com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar products:', error);
    }
  }
}
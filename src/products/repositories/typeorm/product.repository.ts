import { Injectable } from "@nestjs/common";
import { IProductRepository } from "../product.repository";
import { IProduct } from "../../entities/product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../../entities/typeorm/product.entity";
import { Repository } from "typeorm";
import { CreateOneProductDTO } from "../../dto/createOneProduct.dto";

@Injectable()
export class ProductRepository implements IProductRepository {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async createOneProduct(createOneProductDTO: CreateOneProductDTO): Promise<string> {
        const insertResult = await this.productRepository.insert(
            createOneProductDTO,
        ); 

        const productId = insertResult.identifiers[0].id;

        return productId;
        
    }
    async findOneProductById(id: string): Promise<IProduct | null> {
        return await this.productRepository.findOneBy({
            id
        })
    }

    findAllProducts(): Promise<IProduct[]> {
        return this.productRepository.find()
    }
}
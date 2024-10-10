import { ICreateOneProductDTO } from '../dto/createOneProduct.dto';
import { IProduct } from '../entities/product.model';

export interface IProductRepository {
    createOneProduct: (createOneProductDTO: ICreateOneProductDTO) => Promise<string>

    findOneProductById: (id: string) => Promise<IProduct | null>

    findAllProducts: () => Promise<IProduct[]>
}
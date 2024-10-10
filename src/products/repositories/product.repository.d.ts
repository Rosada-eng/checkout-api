import { ICreateOneProductDTO } from '../dto/createOneProduct.dto';
import { IProduct } from '../entities/product.model';

export interface IProductRepository {
    createOne: (createOneProductDTO: ICreateOneProductDTO) => Promise<string>

    findOneById: (id: string) => Promise<IProduct | null>

    findAll: () => Promise<IProduct[]>
}
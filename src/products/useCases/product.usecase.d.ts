import { IProduct } from "../entities/product.entity";
import { ICreateOneProductDTO } from "../dto/createOneProduct.dto.d";


export interface IProductUseCases {
    createOneProduct(createOneProductDTO: ICreateOneProductDTO): Promise<string>
    getOneProduct(productId: string): Promise<IProduct | null>
    getAllProducts(): Promise<IProduct[]>
}
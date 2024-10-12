import { CartProducts } from "../entities/typeorm/cartProducts.entity"

export interface ICartRepository {
    createOneCart(createOneCartDTO: ICreateOneCartDTO): Promise<ICart>

    findOpenCartById(cartId: string): Promise<ICart | null>

    findOpenCartByBuyerId(buyerId: string): Promise<ICart>

    findOneCartById(cartId: string): Promise<ICart>

    findCartsByBuyerId(buyerId: string): Promise<ICart[]>

    createCartProduct(cartId: string, productId: string): Promise<ICartProduct>

    removeCartProduct(cartId: string, productId: string): Promise<void>
    
    updateCartStatus(cartId: string, status: string): Promise<ICart>

    aggregateCartProductsValueInCents(cartId: string): Promise<number>

    persistCart(cart: ICart): Promise<Cart>

    persistCartProduct(cartProduct: ICartProduct): Promise<CartProducts>

}
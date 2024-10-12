import { CreateOneCartDTO } from "../dto/createOneCart.dto"

export interface ICartUseCases {
    createOneCart(createOneCartDTO: CreateOneCartDTO): Promise<ICart>

    findOneCartById(cartId: string): Promise<ICart>

    findCartsByBuyerId(buyerId: string): Promise<ICart[]>

    addOneProductToCart(cartId: string, productId: string): Promise<ICart>

    removeOneProductFromCart(cartId: string, productId: string): Promise<ICart>

    calculateValues(cartId: string): Promise<object>

    cancelCart(cartId: string): Promise<void>

    closeCart(cartId: string): Promise<object>
}
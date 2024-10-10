import { CreateOneCartDTO } from "../dto/createOneCart.dto"

export interface ICartUseCases {
    createOneCart(createOneCartDTO: CreateOneCartDTO): Promise<ICart>

    findOneCartById(cartId: string): Promise<ICart>

    findCartsByBuyerId(buyerId: string): Promise<ICart[]>

    addOneProductToCart(cartId: string, productId: string): Promise<ICart>

    removeOneProductFromCart(cartId: string, productId: string): Promise<ICart>

    calculateSubtotalAmountInCents(cartId: string): Promise<number>

    calculateTaxAmountInCents(csubtotalAmountCents : number): number

    cancelCart(cartId: string): Promise<void>

    closeCart(cartId: string): Promise<void>
}
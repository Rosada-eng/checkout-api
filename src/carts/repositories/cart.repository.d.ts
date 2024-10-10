export interface ICartRepository {
    createOneCart(createOneCartDTO: ICreateOneCartDTO): Promise<ICart>

    findOpenCartById(cartId: string): Promise<ICart | null>

    findOpenCartByBuyerId(buyerId: string): Promise<ICart>

    findOneCartById(cartId: string): Promise<ICart>

    findCartsByBuyerId(buyerId: string): Promise<ICart[]>
    
    updateCartStatus(cartId: string, status: string): Promise<void>

    aggregateCartProductsValueInCents(cartId: string): Promise<number>

}
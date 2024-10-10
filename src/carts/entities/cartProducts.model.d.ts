export interface ICartProducts {
    id: string

    cart: ICart

    product: IProduct

    amount: number
    
    unitPriceCents: number // can apply discounts
}

export interface ICart{
    id: string

    buyer: ICompany

    productCarts: IProductCart[]

    status: string

    subtotalAmountCents: number
    
    taxAmountCents: number
}
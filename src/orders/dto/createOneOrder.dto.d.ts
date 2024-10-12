export interface ICreateOneOrderDTO {
    buyerTaxId: string
    sellerTaxId: string
    cartId: string

    subtotalAmountCents: number
    taxAmountCents: number
    shippingCostCents: number
    buyerFeesCents?: number
}
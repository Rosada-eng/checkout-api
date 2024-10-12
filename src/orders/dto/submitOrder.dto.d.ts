import { PaymentMethodEnum } from "../common/paymentMethodEnum"

export interface ISubmitOrderDTO {
    buyerTaxId: string
    sellerTaxId: string
    cartId: string

    paymentMethod: PaymentMethodEnum
}
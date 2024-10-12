import { ICart } from "src/carts/entities/cart.model.d"
import { ICompany } from "src/companies/entities/company.model.d"
import { OrderStatusEnum, PaymentMethodEnum } from "./typeorm/order.entity"


export interface IOrder {
    id: string

    buyerTaxId: string
    buyer: ICompany

    sellerTaxId: string
    seller: ICompany

    cartId: string
    cart: ICart

    paymentMethod?: PaymentMethodEnum
    paymentOrderId?: string

    status: OrderStatusEnum

    subtotalAmountCents: number
    taxAmountCents: number
    shippingCostCents: number
    buyerFeesCents?: number

    totalInstallments: number
    payedInstallments: number

}
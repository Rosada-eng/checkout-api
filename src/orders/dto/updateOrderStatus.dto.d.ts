import { OrderStatusEnum } from "../common/orderStatusEnum"

export interface IUpdateOrderStatusDTO {
    orderId: string
    status: OrderStatusEnum
}
import { IOrder } from "../entities/orders.model";
import { ICreateOneOrderDTO } from "../dto/createOneOrder.dto.d";

export interface IOrderRepository {
    createOneOrder(createOneOrderDTO: ICreateOneOrderDTO): Promise<IOrder>

    findOrderById(orderId: string): Promise<IOrder | null>

    findOrdersByBuyerId(buyerId: string): Promise<IOrder[]>

    updateOrderStatus(orderId: string, status: string): Promise<void>

    persist(order: IOrder): Promise<IOrder>
}
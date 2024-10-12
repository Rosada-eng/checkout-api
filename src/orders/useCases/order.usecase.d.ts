import { CreateOneOrderDTO } from "../dto/createOneOrder.dto"
import { ISimulatePaymentDTO } from "../dto/simulatePaymentSimulation.dto"
import { ISubmitOrderDTO } from "../dto/submitOrder.dto.d"
import { UpdateOrderStatusDTO } from "../dto/updateOrderStatus.dto"
import { IOrder, OrderStatusEnum } from "../entities/orders.model"

export interface IOrderUseCases {
    findOneOrderById(orderId: string): Promise<IOrder>

    createOneOrder(createOneOrderDTO: CreateOneOrderDTO): Promise<IOrder>

    submitOrder(submitOrderDTO: ISubmitOrderDTO): Promise<Order>

    cancelOrder(cartId: string): Promise<void>

    updateOrderStatus(updateOrderStatusDTO: UpdateOrderStatusDTO): Promise<void>
    
    simulatePayment(simulatePaymentDTO: ISimulatePaymentDTO): Promise<object>

}
import { IOrderRepository } from '../repositories/order.repository.d';
import { CreateOneOrderDTO } from '../dto/createOneOrder.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Order } from '../entities/typeorm/order.entity';
import { PaymentMethodEnum } from '../common/paymentMethodEnum';
import { OrderStatusEnum } from '../common/orderStatusEnum';

@Injectable()
export class OrderRepository implements IOrderRepository {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    async createOneOrder(createOneOrderDTO: CreateOneOrderDTO): Promise<Order> {

        const order = await this.orderRepository.create(createOneOrderDTO)

        return await this.orderRepository.save(order)
    }

    async findOrderById(orderId: string): Promise<Order | null> {
        return await this.orderRepository.findOne({
            where: {
                id: orderId
            }
        })
    }

    async findPendingPaymentOrderFromCart(cartId: string): Promise<Order | null> {
        return await this.orderRepository.findOne({
            where: {
                cartId,
                status: OrderStatusEnum.PENDING_PAYMENT_METHOD
            }
        })
    }

    async findOrdersByBuyerId(buyerTaxId: string): Promise<Order[]> {
        return await this.orderRepository.find({
            where: {
                buyerTaxId
            }
        })
    }

    async updateOneOrder(orderId: string, updatedOrder: Partial<Order>): Promise<void> {
        await this.orderRepository.update(orderId, updatedOrder)
    }

    async updateOrderStatus(orderId: string, status: OrderStatusEnum): Promise<void> {
        await this.orderRepository.update(orderId, { status: status })
    }

    async updatePaymentMethod(orderId: string, paymentMethod: PaymentMethodEnum, paymentOrderId: string): Promise<void> {
        await this.orderRepository.update(
            orderId, 
            { 
                paymentMethod,
                paymentOrderId,
            }
        )
    }

    async persist(order: Order): Promise<Order> {
        return await this.orderRepository.manager.save(order)
    }
}
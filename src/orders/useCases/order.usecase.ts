import { Inject, Injectable } from "@nestjs/common";
import { IOrderUseCases } from "../useCases/order.usecase.d";
import { OrderRepository } from "../repositories/order.repository";
import { CreateOneOrderDTO } from "../dto/createOneOrder.dto";
import { Order } from "../entities/typeorm/order.entity";
import { simulatePaymentSimulationThroughAPI, simulatePaymentThroughAPI, simulateShippingCostCents } from "../useCases/simulator/simulator";
import { SimulatePaymentSimulationDTO } from "../dto/simulatePaymentSimulation.dto";
import { ISubmitOrderDTO } from "../dto/submitOrder.dto.d";
import { CartRepository } from "src/carts/repositories/typeorm/cart.repository";
import { PaymentMethodEnum } from "../common/paymentMethodEnum";
import { OrderStatusEnum } from "../common/orderStatusEnum";
import { UpdateOrderStatusDTO } from "../dto/updateOrderStatus.dto";

@Injectable()
export class OrderUseCases implements IOrderUseCases {

    constructor(
        private readonly orderRepository: OrderRepository,

        private readonly cartRepository: CartRepository,
    ) { }

    async findOneOrderById(orderId: string): Promise<Order> {
        return await this.orderRepository.findOrderById(orderId)
    }

    async createOneOrder(createOneOrderDTO: CreateOneOrderDTO): Promise<Order> {
        return await this.orderRepository.createOneOrder(createOneOrderDTO)
    }

    async cancelOrder(cartId: string): Promise<void> {
        const order = await this.orderRepository.findOrderById(cartId)

        if (!order) {
            throw new Error('Order not found')
        }
        
        const canceledStatus = order.status === OrderStatusEnum.PENDING_PAYMENT_METHOD ? OrderStatusEnum.CANCELED_BEFORE_SUBMIT : OrderStatusEnum.CANCELED

        return await this.orderRepository.updateOrderStatus(cartId, canceledStatus)
    }

    async updateOrderStatus(updateOrderStatus: UpdateOrderStatusDTO): Promise<void> {
        return await this.orderRepository.updateOrderStatus(updateOrderStatus.orderId, updateOrderStatus.status)
    }

    async  simulatePayment(simulatePaymentDTO: SimulatePaymentSimulationDTO): Promise<object> {
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        return simulatePaymentSimulationThroughAPI(simulatePaymentDTO).data;
    
    }

    async submitOrder(submitOrderDTO: ISubmitOrderDTO): Promise<Order> {
        var cart = await this.cartRepository.findOneCartById(submitOrderDTO.cartId)

        if (!cart) {
            throw new Error('Cart not found')
        }

        cart = await this.cartRepository.updateCartValueCents(cart.id)

        const shippingCostCents = simulateShippingCostCents().data.shippingCostCents

        const orderWithPendingPaymentMethod = await this.orderRepository.findPendingPaymentOrderFromCart(cart.id)

        const createOneOrderCredixAPIPayload = {
            buyerTaxId: orderWithPendingPaymentMethod.buyerTaxId,
            sellerTaxId: orderWithPendingPaymentMethod.sellerTaxId,

            externalId: orderWithPendingPaymentMethod.id,
            
            subtotalAmountCents: orderWithPendingPaymentMethod.subtotalAmountCents,
            taxAmountCents: orderWithPendingPaymentMethod.taxAmountCents,
            shippingCostCents: orderWithPendingPaymentMethod.shippingCostCents,

            shippingLocation: {
                address1: "Rua da Consolação, 930",
                address2: "Apto 101",
                city: "São Paulo",
                region: "São Paulo",
                postalCode: "01302000",
                country: "Brazil"
            },

            estimatedDeliveryDateUTC: "2025-02-05T00:00:00Z",

            installments: [
                {
                    maturityDate: "2025-02-10T00:00:00Z",
                    faceValueCents: orderWithPendingPaymentMethod.subtotalAmountCents
                }
            ],

            items: cart.productCarts.map((productCart) => ({
                productId: productCart.productId,
                productName: productCart.product?.name,
                quantity: productCart.quantity,
                unitPriceCents: productCart.product?.unitPriceCents
            }))
        }

        const credixAPIResponse = simulatePaymentThroughAPI(createOneOrderCredixAPIPayload)

        if (credixAPIResponse.data.status === "created") {
            await this.orderRepository.updateOneOrder(
                orderWithPendingPaymentMethod.id,
                {
                    paymentMethod: submitOrderDTO.paymentMethod,
                    paymentOrderId: credixAPIResponse.data.id,
                    buyerFeesCents: credixAPIResponse.data.buyerFeesCents,
                    status: OrderStatusEnum.WAITING_FOR_PAYMENT
                }
            )
        } 


        return await this.orderRepository.persist(orderWithPendingPaymentMethod)

    }

}
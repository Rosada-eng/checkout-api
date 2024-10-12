import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderUseCases } from '../useCases/order.usecase';
import { CreateOneOrderDTO } from '../dto/createOneOrder.dto';
import { SubmitOrderDTO } from '../dto/submitOrder.dto';
import { OrderStatusEnum } from '../common/orderStatusEnum';
import { SimulatePaymentDTO } from 'src/carts/dto/simulatePayment.dto';
import { UpdateOrderStatusDTO } from '../dto/updateOrderStatus.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersUseCases: OrderUseCases) {}

  @Post()
  create(@Body() createOrderDto: CreateOneOrderDTO) {
    return this.ordersUseCases.createOneOrder(createOrderDto);
  }

  @Post('/cancel/:id')
  cancel(@Param('id') orderId: string) {
    return this.ordersUseCases.cancelOrder(orderId);
  }

  @Patch('/update-status/')
  updateStatus(@Body() updateOrderStatusDTO: UpdateOrderStatusDTO) {
    return this.ordersUseCases.updateOrderStatus(updateOrderStatusDTO);
  }

  @Post('/simulate-payment')
  simulatePayment(@Body() simulatePaymentDTO: SimulatePaymentDTO) {
    return this.ordersUseCases.simulatePayment(simulatePaymentDTO);
  }

  @Post('/submit')
  submit(@Body() submitOrderDTO: SubmitOrderDTO) {
    return this.ordersUseCases.submitOrder(submitOrderDTO);
  }

  @Get(':id')
  findOne(@Param('id') orderId: string) {
    return this.ordersUseCases.findOneOrderById(orderId);
  }

  
}

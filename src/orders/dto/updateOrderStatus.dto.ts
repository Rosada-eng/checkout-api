import { IsEnum, IsString } from "class-validator"
import { OrderStatusEnum } from "../common/orderStatusEnum"
import { IUpdateOrderStatusDTO } from "./updateOrderStatus.dto.d"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateOrderStatusDTO implements IUpdateOrderStatusDTO {
    @IsString()
    @ApiProperty()
    orderId: string

    @IsEnum(OrderStatusEnum)
    @ApiProperty({ enum: OrderStatusEnum })
    status: OrderStatusEnum
} 
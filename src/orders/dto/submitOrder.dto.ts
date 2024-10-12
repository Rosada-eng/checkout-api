import { IsEnum, IsString, Length } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ISubmitOrderDTO } from "./submitOrder.dto.d";
import { PaymentMethodEnum } from "../common/paymentMethodEnum";

export class SubmitOrderDTO implements ISubmitOrderDTO {
    @IsString()
    @Transform(({ value }) => {
        const onlyNumbersRegex = /\D/g;
        const clearTaxId = value.replace(onlyNumbersRegex, '');
    
        if (clearTaxId.length > 0) {
          return clearTaxId;
        }
    
        return null;
      }
    )
    @Length(14)
    @ApiProperty({
        example: '26.900.161/0001-25',
        description: 'Company CNPJ number. There is no need to send special characters, only numbers',
        }
    )
    buyerTaxId: string
    
    @IsString()
    @Transform(({ value }) => {
        const onlyNumbersRegex = /\D/g;
        const clearTaxId = value.replace(onlyNumbersRegex, '');
    
        if (clearTaxId.length > 0) {
          return clearTaxId;
        }
    
        return null;
      }
    )
    @Length(14)
    @ApiProperty({
        example: '26.900.161/0001-25',
        description: 'Company CNPJ number. There is no need to send special characters, only numbers',
        }
    )
    sellerTaxId: string
    
    @IsString()
    @ApiProperty()
    cartId: string

    @IsEnum(PaymentMethodEnum)
    @ApiProperty({ enum: PaymentMethodEnum })
    paymentMethod: PaymentMethodEnum
}
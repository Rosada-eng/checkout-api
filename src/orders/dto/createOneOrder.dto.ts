import { IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ICreateOneOrderDTO } from "./createOneOrder.dto.d";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateOneOrderDTO implements ICreateOneOrderDTO {

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
    @ApiProperty({
        example: '5f4c2b6f-8c4f-4e7f-8c2a-2f4f8e1b6d8d',
        description: 'Cart UUID',
        }
    )
    cartId: string;

    @IsNumber()
    @ApiProperty({
        example: 1000,
        description: 'Subtotal amount in cents',
        }
    )
    subtotalAmountCents: number;

    @IsNumber()
    @ApiProperty({
        example: 100,
        description: 'Tax amount in cents',
        }
    )
    taxAmountCents: number;

    @IsNumber()
    @ApiProperty({
        example: 100,
        description: 'Shipping cost in cents',
        }
    )
    shippingCostCents: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        example: 100,
        description: 'Buyer fees in cents',
        }
    )
    buyerFeesCents?: number;
}
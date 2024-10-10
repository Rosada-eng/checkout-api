import { IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ICreateOneProductDTO } from './createOneProduct.dto.d';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOneProductDTO implements ICreateOneProductDTO {
    @IsString()
    @MinLength(
        3,
        { message: 'A product must have a name with at least 3 characters' }
    )
    @ApiProperty({
        example: 'ROYAL CANIN GIANT JUNIOR'
    })
    name: string

    @IsNumber()
    @Min(1, { message: 'The default unit price of a product must be at least 1 cent' })
    @ApiProperty({
        example: 10000,
        description: 'The default value (before any discount) of the product in Reais, measured in cents'
    })
    defaultUnitPriceCents: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'https://www.petlove.com.br/images/products/234372/product/Royal_Canin_Giant_Junior_12kg_234372_1.jpg'
    })
    imageUrl?: string;

}
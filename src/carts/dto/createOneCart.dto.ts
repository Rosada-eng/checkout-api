import { ApiProperty } from '@nestjs/swagger';
import { ICreateOneCartDTO } from './createOneCart.dto.d';
import { IsString } from 'class-validator';

export class CreateOneCartDTO implements ICreateOneCartDTO {
    @IsString()
    @ApiProperty()
    buyerTaxId: string
}
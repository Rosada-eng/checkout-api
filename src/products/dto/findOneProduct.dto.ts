import { IsOptional, IsString } from 'class-validator';
import { IFindOneProductDTO } from './findOneProduct.dto.d';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneProductDTO implements IFindOneProductDTO {
    @IsString()
    @ApiProperty()
    id: string
}
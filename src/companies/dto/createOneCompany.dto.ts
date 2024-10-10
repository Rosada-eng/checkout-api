import { ICreateOneCompanyDTO } from './createOneCompany.dto.d';
import { IsOptional, IsString, Length, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';


export class CreateOneCompanyDTO implements ICreateOneCompanyDTO {
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
    taxId: string

    @IsString()
    @MinLength(5, 
        { message: 'The company\'s name must have at least 5 characteres' }
    )
    @ApiProperty({
        example: 'Apple Electronic Trading (Beijing) Co., Ltd.',
        description: 'Company legal name',
        }
    )
    legalName: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Apple Inc.',
        description: 'Company business name',
    })
    businessName?: string
}
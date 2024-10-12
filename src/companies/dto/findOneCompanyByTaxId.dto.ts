import { IsString, Length } from 'class-validator';
import { IFindOneCompanyByTaxIdDTO } from './findOneCompanyByTaxId.dto.d';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindOneCompanyByTaxIdDTO implements IFindOneCompanyByTaxIdDTO {
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
}
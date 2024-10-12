import { ISimulatePaymentSimulationDTO } from "../../orders/dto/simulatePaymentSimulation.dto.d";
import { IsString, Length, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SimulatePaymentDTO implements ISimulatePaymentSimulationDTO {
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

    @IsNumber()
    @ApiProperty({
        example: 1000,
        description: 'Subtotal amount in cents',
        }
    )
    totalOrderAmountCents: number

    @IsNumber()
    @ApiProperty({
        example: 3,
        description: 'Maximum number of installments',
        }
    )
    maxNumberOfInstallments: number

    @IsNumber()
    @ApiProperty({
        example: 30,
        description: 'Period duration in days',
        }
    )
    periodDuration: number


}
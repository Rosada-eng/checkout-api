import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne} from 'typeorm'
import { ICompany } from '../company.model'

@Entity('company')
export class Company implements ICompany{

    @PrimaryColumn({ comment: 'Companies CNPJ' })
    taxId: string

    @Column()
    legalName: string

    @Column({ nullable: true })
    businessName: string

    @CreateDateColumn()
    createdAt: Date
}

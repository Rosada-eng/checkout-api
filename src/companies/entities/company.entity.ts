import { Entity, Column, PrimaryColumn, CreateDateColumn} from 'typeorm'

@Entity('company')
export class Company {

    @PrimaryColumn({ comment: 'Companies CNPJ' })
    taxId: string

    @Column()
    legalName: string

    @Column({ nullable: true })
    businessName: string

    @CreateDateColumn()
    createdAt: Date

}

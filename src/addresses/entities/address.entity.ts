import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('address')
export class Address {

    @PrimaryGeneratedColumn("uuid")
    id: string

    // A company can have more than one address. For simplicity, we will assume only one address per company.
    // but this model already supports multiple addresses.
    @Column()
    companyTaxId: string // TODO: point to a FK

    @Column()
    postalCode: string

    @Column()
    country: string

    @Column()
    region: string

    @Column()
    address: string

    @Column()
    complement: string

    @CreateDateColumn()
    createdAt: Date

}

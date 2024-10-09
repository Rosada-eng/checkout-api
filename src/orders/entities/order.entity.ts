import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    sellerTaxId: string // TODO: point to a FK

    @Column()
    buyerTaxId: string // TODO: point to a FK

    @Column()
    externalId: string

    @Column()
    shippingId: string // TODO: point to a FK

    @Column()
    subtotalAmountCents: number

    @Column()
    taxAmountCents: number

    @CreateDateColumn()
    createdAt: Date
}

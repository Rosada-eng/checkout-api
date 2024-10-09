import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class Cart {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    orderId: string // TODO: point to a FK

    @Column()
    productId: string // TODO: point to a FK

    @Column({
        default: 1
    })
    quantity: number

    @Column({
        comment: 'unit price may apply discounts'
    })
    unitPriceCents: number
}
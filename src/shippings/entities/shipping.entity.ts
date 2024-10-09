import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping')
export class Shipping {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column() // Todo: point to FK
    orderId: string

    @Column() // Todo: point to FK
    fromAddressId: string

    @Column() // Todo: point to FK
    toAddressId: string

    @Column()
    estimatedDeliveryDate: Date

    @Column()
    costCents: number

    @Column()
    status: string // TODO: enum

    @Column()
    observation: string

    @CreateDateColumn()
    createdAt: Date

}

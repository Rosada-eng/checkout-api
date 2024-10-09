import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('installment')
export class Installment {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column() // Todo: point to FK
    orderId: string

    @Column()
    maturityDate: Date

    @Column()
    faceValueCents: number

    @Column()
    status: string // TODO: enum

    @Column()
    payedAt: Date

    @CreateDateColumn()
    createdAt: Date

}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IProduct } from '../product.model';

@Entity('product')
export class Product implements IProduct {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    defaultUnitPriceCents: number

    @Column({ nullable: true })
    imageUrl: string | null

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

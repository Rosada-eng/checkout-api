import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ICart } from '../cart.model';
import { Company } from 'src/companies/entities/typeorm/company.entity';
import { CartProducts } from './cartProducts.entity';

@Entity('cart')
export class Cart implements ICart{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    bueyerTaxId: string // TODO: point to a FK

    @ManyToOne(() => Company, (company) => company.taxId)
    @JoinColumn({
        name: 'bueyerTaxId',
        referencedColumnName: 'taxId',
        foreignKeyConstraintName: 'FK_cart_company'
    })
    buyer: Company

    @OneToMany(() => CartProducts, (cartProducts) => cartProducts.cart)
    productCarts: CartProducts[]

    @Column()
    status: string // TODO: enum

    @Column()
    subtotalAmountCents: number // Not sure if it should be here

    @Column()
    taxAmountCents: number // Not sure if it should be here

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

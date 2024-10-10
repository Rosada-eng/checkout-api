import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ICartProducts } from '../cartProducts.model';
import { Cart } from './cart.entity';
import { Product } from 'src/products/entities/typeorm/product.entity';

@Entity('cart_products')
export class CartProducts implements ICartProducts {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    cartId: string

    @OneToOne(() => Cart)
    @JoinColumn({
        name: 'cartId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_cart_products_cart'
    })
    cart: Cart

    @Column()
    productId: string

    @ManyToOne(() => Product, (product) => product.id)
    product: Product

    @Column({ default: 1 })
    quantity: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
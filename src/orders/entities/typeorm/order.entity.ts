import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "src/companies/entities/typeorm/company.entity";
import { Cart } from "src/carts/entities/typeorm/cart.entity";
import { IOrder } from "../orders.model";
import { PaymentMethodEnum } from "src/orders/common/paymentMethodEnum";
import { OrderStatusEnum } from "src/orders/common/orderStatusEnum";

@Entity('order')
export class Order implements IOrder {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    buyerTaxId: string

    @ManyToOne(() => Company, (company) => company.taxId)
    @JoinColumn({
        name: 'buyerTaxId',
        referencedColumnName: 'taxId',
        foreignKeyConstraintName: 'FK_order_buyer_company'
    })
    buyer: Company

    @Column()
    sellerTaxId: string

    @ManyToOne(() => Company, (company) => company.taxId)
    @JoinColumn({
        name: 'sellerTaxId',
        referencedColumnName: 'taxId',
        foreignKeyConstraintName: 'FK_order_seller_company'
    })
    seller: Company

    @Column()
    cartId: string

    @OneToOne(() => Cart, (cart) => cart.id)
    @JoinColumn({
        name: 'cartId',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_order_cart'
    })
    cart: Cart

    @Column({ enum: PaymentMethodEnum, nullable: true })
    paymentMethod?: PaymentMethodEnum

    @Column({ nullable: true })
    paymentOrderId?: string

    @Column({ enum: OrderStatusEnum, default: OrderStatusEnum.PENDING_PAYMENT_METHOD })
    status: OrderStatusEnum

    @Column({ default: 0 })
    subtotalAmountCents: number

    @Column({ default: 0 })
    taxAmountCents: number

    @Column({ default: 0 })
    shippingCostCents: number

    @Column({ default: 0, nullable: true })
    buyerFeesCents?: number

    @Column({ default: 1 })
    totalInstallments: number

    @Column({ default: 0 })
    payedInstallments: number

    // Todo: Add shipping entity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
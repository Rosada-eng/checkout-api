import { Injectable } from "@nestjs/common";
import { ICartRepository } from "../cart.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart, CartStatus } from "../../entities/typeorm/cart.entity";
import { CartProducts } from "src/carts/entities/typeorm/cartProducts.entity";
import { CreateOneCartDTO } from "../../dto/createOneCart.dto";
import { Product } from "src/products/entities/typeorm/product.entity";

@Injectable()
export class CartRepository implements ICartRepository {

    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,

        @InjectRepository(CartProducts)
        private readonly cartProductsRepository: Repository<CartProducts>
    ) { }

    async createOneCart(createOneCartDTO: CreateOneCartDTO): Promise<Cart> {
        const cart = this.cartRepository.create(createOneCartDTO)

        await this.cartRepository.save(cart)

        return cart
    }

    async findOpenCartById(cartId: string): Promise<Cart | null> {
        return await this.cartRepository.findOne({
            where: {
                id: cartId,
                status: CartStatus.OPEN
            }
        })
    }

    async findOpenCartByBuyerId(buyerTaxId: string): Promise<Cart | null> {
        return await this.cartRepository.findOne({
            where: {
                buyerTaxId: buyerTaxId,
                status: CartStatus.OPEN
            }
        })
    }

    async findOneCartById(cartId: string): Promise<Cart | null> {
        return await this.cartRepository.findOne({
            where: {
                id: cartId,
            }
        })
    }

    async findCartsByBuyerId(buyerTaxId: string): Promise<Cart[] | null> {
        return await this.cartRepository.find({
            where: {
                buyerTaxId: buyerTaxId,
            }
        })
    }

    async createCartProduct(cartId: string, productId: string) {
        const cartProduct = this.cartProductsRepository.create({
            cartId: cartId,
            productId: productId,
            quantity: 1
        })

        return cartProduct
    }

    async persist(cart: Cart): Promise<void> {
        await this.cartRepository.manager.save(cart)
    }

    async updateCartStatus(cartId: string, status: CartStatus): Promise<void> {
        const cart = await this.cartRepository.findOne({
            where: {
                id: cartId
            }
        })

        cart.status = status

        await this.cartRepository.save(cart)

    }

    async aggregateCartProductsValueInCents(cartId: string): Promise<number> {
        const resultQuery = await this.cartProductsRepository.createQueryBuilder('cartProducts')
            .select('SUM(cartProducts.quantity * products.priceCents)', 'total')
            .innerJoin(Product, 'products', 'products.id = cartProducts.productId')
            .where('cartProducts.cartId = :cartId', { cartId: cartId })
            .getRawOne()

        return resultQuery.total
    }
}
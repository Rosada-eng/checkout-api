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
            },
            relations: ['productCarts']
        })
    }

    async findOpenCartByBuyerId(buyerTaxId: string): Promise<Cart | null> {
        return await this.cartRepository.findOne({
            where: {
                buyerTaxId: buyerTaxId,
                status: CartStatus.OPEN
            },
            relations: ['productCarts']
        })
    }

    async findOneCartById(cartId: string): Promise<Cart | null> {
        return await this.cartRepository.findOne({
            where: {
                id: cartId,
            },
            relations: ['productCarts']
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

    async removeCartProduct(cartId: string, productId: string) {
        await this.cartProductsRepository.delete({
            cartId: cartId,
            productId: productId
        })
    }

    async persistCart(cart: Cart): Promise<Cart> {
        return await this.cartRepository.manager.save(cart)
    }

    async persistCartProduct(cartProduct: CartProducts): Promise<CartProducts> {
        return await this.cartProductsRepository.manager.save(cartProduct)
    }

    async updateCartStatus(cartId: string, status: CartStatus): Promise<Cart> {
        const cart = await this.cartRepository.findOne({
            where: {
                id: cartId
            }
        })

        cart.status = status

        return await this.cartRepository.save(cart)

    }

    async aggregateCartProductsValueInCents(cartId: string): Promise<number> {
        const resultQuery = await this.cartProductsRepository.createQueryBuilder('cartProducts')
            .select('SUM(cartProducts.quantity * products.unitPriceCents)', 'total')
            .innerJoin(Product, 'products', 'products.id = cartProducts.productId')
            .where('cartProducts.cartId = :cartId', { cartId: cartId })
            .getRawOne()

        return parseInt(resultQuery.total)
    }

    calculateTaxAmountInCents(subtotalAmountCents : number): number {
        return subtotalAmountCents * 0.04;
    }

    async updateCartValueCents(cartId: string): Promise<Cart> {
        const cart = await this.findOneCartById(cartId)

        const subtotalAmountValue = await this.aggregateCartProductsValueInCents(cartId)

        const taxAmountCents = this.calculateTaxAmountInCents(subtotalAmountValue)

        cart.subtotalAmountCents = subtotalAmountValue
        cart.taxAmountCents = taxAmountCents

        return await this.persistCart(cart)
    }
}
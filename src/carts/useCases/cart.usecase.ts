import { Injectable } from '@nestjs/common';
import { ICartUseCases } from './cart.usecase.d';
import { CartRepository } from '../repositories/typeorm/cart.repository';
import { CreateOneCartDTO } from '../dto/createOneCart.dto';
import { ProductRepository } from 'src/products/repositories/typeorm/product.repository';
import { Cart, CartStatus } from '../entities/typeorm/cart.entity';
import { CompanyRepository } from 'src/companies/repositories/typeorm/company.repository';

@Injectable()
export class CartUseCases implements ICartUseCases {
  
  constructor(
    private readonly cartRepository: CartRepository,

    private readonly productRepository: ProductRepository,

    private readonly companyRepository: CompanyRepository
  ) { }

  async createOneCart({ buyerTaxId }: CreateOneCartDTO): Promise<Cart> {
    const buyer = this.companyRepository.findOneCompanyByTaxId({ taxId: buyerTaxId });

    if (!buyer) {
      throw new Error('Company not found');
    }
    
    return await this.cartRepository.createOneCart({ buyerTaxId });
  }

  async findOneCartById(cartId: string): Promise<Cart> {
    return await this.cartRepository.findOneCartById(cartId);
  }

  async findCartsByBuyerId(buyerId: string): Promise<Cart[]> {
    return await this.cartRepository.findCartsByBuyerId(buyerId);
  }

  async addOneProductToCart(cartId: string, productId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOpenCartById(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const product = await this.productRepository.findOneProductById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const cartProductsInCart = cart.productCarts.find((cartProduct) => cartProduct.productId === productId);

    if (cartProductsInCart) {
      cartProductsInCart.quantity += 1;
    } else {
      const newCartProduct = await this.cartRepository.createCartProduct(cartId, productId);

      cart.productCarts.push(newCartProduct);
    }

    await this.cartRepository.persist(cart);

    return cart;
  }

  async removeOneProductFromCart(cartId: string, productId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOpenCartById(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const cartProduct = cart.productCarts.find((productCart) => productCart.productId === productId);

    if (!cartProduct) {
      throw new Error('Product not found in cart');
    }

    if (cartProduct.quantity > 1) {
      cartProduct.quantity -= 1;
    } else {
      cart.productCarts = cart.productCarts.filter((productCart) => productCart.productId !== productId);
    }

    await this.cartRepository.persist(cart);

    return cart;
  }

  async cancelCart(cartId: string): Promise<void> {
    return await this.cartRepository.updateCartStatus(cartId, CartStatus.CANCELED);
  }

  async closeCart(cartId: string): Promise<void> {
    return await this.cartRepository.updateCartStatus(cartId, CartStatus.CLOSED);
  }

  async calculateSubtotalAmountInCents(cartId: string): Promise<number> {
    return await this.cartRepository.aggregateCartProductsValueInCents(cartId);
  }

  calculateTaxAmountInCents(subtotalAmountCents : number): number {
    return subtotalAmountCents * 0.04;
  }

}

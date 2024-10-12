import { Injectable } from '@nestjs/common';
import { ICartUseCases } from './cart.usecase.d';
import { CartRepository } from '../repositories/typeorm/cart.repository';
import { CreateOneCartDTO } from '../dto/createOneCart.dto';
import { ProductRepository } from 'src/products/repositories/typeorm/product.repository';
import { Cart, CartStatus } from '../entities/typeorm/cart.entity';
import { CompanyRepository } from 'src/companies/repositories/typeorm/company.repository';
import { OrderRepository } from 'src/orders/repositories/order.repository';
import { simulateShippingCostCents } from 'src/orders/useCases/simulator/simulator';

@Injectable()
export class CartUseCases implements ICartUseCases {
  
  constructor(
    private readonly cartRepository: CartRepository,

    private readonly productRepository: ProductRepository,

    private readonly companyRepository: CompanyRepository,

    private readonly orderRepository: OrderRepository
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

    await this.cartRepository.persistCart(cart);

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

    if (cartProduct.quantity > 0) {
      cartProduct.quantity -= 1;
    } 

    await this.cartRepository.persistCart(cart);

    if (cartProduct.quantity === 0) {
      await this.cartRepository.removeCartProduct(cartId, productId);
      await this.cartRepository.persistCartProduct(cartProduct);
    }

    return cart;
  }

  async cancelCart(cartId: string): Promise<void> {
    await this.cartRepository.updateCartStatus(cartId, CartStatus.CANCELED);
  }

  async closeCart(cartId: string): Promise<object> {
    const cart = await this.cartRepository.updateCartStatus(cartId, CartStatus.CLOSED);

    await this.cartRepository.updateCartValueCents(cartId); 

    const shippingCostCents = simulateShippingCostCents().data.shippingCostCents || 0;

    const order = await this.orderRepository.createOneOrder({
      cartId: cart.id,
      buyerTaxId: cart.buyerTaxId,
      sellerTaxId: cart.buyerTaxId,
      subtotalAmountCents: cart.subtotalAmountCents,
      taxAmountCents: cart.taxAmountCents,
      shippingCostCents,
    });

    return {
      order,
      cart
    }
  }

  async calculateValues(cartId: string): Promise<object> {
    const subtotalAmountCents = await this.cartRepository.aggregateCartProductsValueInCents(cartId);
    const taxAmountCents = this.cartRepository.calculateTaxAmountInCents(subtotalAmountCents);

    const cart = await this.cartRepository.findOneCartById(cartId);

    cart.subtotalAmountCents = subtotalAmountCents;
    cart.taxAmountCents = taxAmountCents;

    await this.cartRepository.persistCart(cart);

    return {
      subtotalAmountCents,
      taxAmountCents
    }


  }


  

}

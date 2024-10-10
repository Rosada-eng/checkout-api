import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartUseCases } from '../useCases/cart.usecase';
import { CreateOneCartDTO } from '../dto/createOneCart.dto';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private readonly cartsUseCases: CartUseCases) {}

  @Get(':id')
  findOne(@Param('id') cartId: string) {
    return this.cartsUseCases.findOneCartById(cartId);
  }

  @Get('/buyer/:id')
  findCartsByBuyerId(@Param('id') buyerId: string) {
    return this.cartsUseCases.findCartsByBuyerId(buyerId);
  }

  @Post()
  create(@Body() createCartDto: CreateOneCartDTO) {
    return this.cartsUseCases.createOneCart(createCartDto);
  }

  @Post('/cancel/:id')
  cancel(@Param('id') cartId: string) {
    return this.cartsUseCases.cancelCart(cartId);
  }

  @Post('/close/:id')
  close(@Param('id') cartId: string) {
    return this.cartsUseCases.closeCart(cartId);
  }

  @Patch('/add-product/:cartId/:productId')
  addProduct(@Param('cartId') cartId: string, @Param('productId') productId: string) {
    return this.cartsUseCases.addOneProductToCart(cartId, productId);
  }

  @Patch('/remove-product/:cartId/:productId')
  removeProduct(@Param('cartId') cartId: string, @Param('productId') productId: string) {
    return this.cartsUseCases.removeOneProductFromCart(cartId, productId);
  }

  @Post('/calculate-values/:id')
  async calculateValues(@Param('id') cartId: string) {
    const subtotalAmountCents = await this.cartsUseCases.calculateSubtotalAmountInCents(cartId);

    const taxAmountCents = this.cartsUseCases.calculateTaxAmountInCents(subtotalAmountCents);

    return {
      subtotalAmountCents,
      taxAmountCents
    };
  }


}

import TicketRepository from '../repositories/ticket.repository.js';
import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import { generateTicketCode } from '../utils/generateTicketCode.js';

const ticketRepo = new TicketRepository();
const cartRepo = new CartRepository();
const productRepo = new ProductRepository();

export default class TicketService {
  async purchaseCart(cartId, user) {
    const cart = await cartRepo.getCartById(cartId);
    if (!cart || cart.products.length === 0) {
      throw new Error('El carrito está vacío o no existe');
    }

    let amount = 0;
    const purchasedProducts = [];
    const failedProducts = [];

    for (const item of cart.products) {
      const product = await productRepo.getProductById(item.product._id);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productRepo.updateProduct(product._id, { stock: product.stock });

        amount += product.price * item.quantity;

        purchasedProducts.push({
          product,
          quantity: item.quantity
        });
      } else {
        failedProducts.push({
          title: product.title,
          requested: item.quantity,
          available: product.stock
        });
      }
    }

    if (purchasedProducts.length === 0) {
      throw new Error('No hay stock suficiente para ningún producto');
    }

    const ticketData = {
      code: generateTicketCode(),
      amount,
      purchaser: {
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      products: purchasedProducts,
      purchase_datetime: new Date()
    };

    const ticket = await ticketRepo.createTicket(ticketData);

    return {
      ticket,
      failedProducts
    };
  }
}

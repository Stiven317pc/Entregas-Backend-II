import CartRepository from '../repositories/cart.repository.js';

const cartRepo = new CartRepository();

export default class CartService {
  async createCart() {
    return await cartRepo.createCart();
  }

  async getCart(id) {
    return await cartRepo.getCartById(id);
  }

  async addProduct(cartId, productId, quantity) {
    return await cartRepo.addProduct(cartId, productId, quantity);
  }

  async removeProduct(cartId, productId) {
    return await cartRepo.removeProduct(cartId, productId);
  }

  async clearCart(cartId) {
    return await cartRepo.clearCart(cartId);
  }
}

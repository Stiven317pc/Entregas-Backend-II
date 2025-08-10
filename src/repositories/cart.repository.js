import CartDAO from '../daos/cart.dao.js';

const cartDAO = new CartDAO();

export default class CartRepository {
  async createCart() {
    return await cartDAO.createCart();
  }

  async getCartById(id) {
    return await cartDAO.getCartById(id);
  }

  async addProduct(cartId, productId, quantity = 1) {
    const cart = await cartDAO.getCartById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product._id.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cartDAO.updateCart(cartId, { products: cart.products });
  }

  async removeProduct(cartId, productId) {
    return await cartDAO.removeProduct(cartId, productId);
  }

  async clearCart(cartId) {
    return await cartDAO.clearCart(cartId);
  }
}

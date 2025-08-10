import CartModel from '../models/Cart.js';

export default class CartDAO {
  async createCart() {
    return CartModel.create({ products: [] });
  }

  async getCartById(id) {
    return CartModel.findById(id).populate('products.product');
  }

  async updateCart(cartId, updatedCart) {
    return CartModel.findByIdAndUpdate(cartId, updatedCart, { new: true });
  }

  async removeProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    return cart.save();
  }

  async clearCart(cartId) {
    return CartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
  }

  async deleteCart(cartId) {
    return CartModel.findByIdAndDelete(cartId);
  }
}

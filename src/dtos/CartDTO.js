export default class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.products = cart.products.map(p => ({
      title: p.product?.title || 'Producto desconocido',
      price: p.product?.price || 0,
      quantity: p.quantity,
      category: p.product?.category || 'Sin categoría',
    }));

    this.total = this.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }
}

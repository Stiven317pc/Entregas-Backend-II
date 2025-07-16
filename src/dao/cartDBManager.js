import { cartModel } from "./models/cartModel.js";

class cartDBManager {
  constructor(productDBManager) {
    this.productDBManager = productDBManager;
  }

  async getAllCarts() {
    return cartModel.find();
  }

  async getProductsFromCartByID(cid) {
    if (!cid || typeof cid !== 'string' || cid.length !== 24) {
      throw new Error(`❌ El ID del carrito es inválido: ${cid}`);
    }

    let cart;
    try {
      cart = await cartModel.findOne({ _id: cid }).populate('products.product');
    } catch (err) {
      throw new Error(`❌ Error buscando carrito ${cid}: ${err.message}`);
    }

    if (!cart) throw new Error(`🛒 El carrito ${cid} no fue encontrado`);

    return cart;
  }

  async createCart() {
    return await cartModel.create({ products: [] });
  }

  async addProductByID(cid, pid) {
    await this.productDBManager.getProductByID(pid);
    const cart = await this.getProductsFromCartByID(cid);

    let i = null;
    const result = cart.products.filter((item, index) => {
      if (item.product.toString() === pid) i = index;
      return item.product.toString() === pid;
    });

    if (result.length > 0) {
      cart.products[i].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cartModel.updateOne({ _id: cid }, { products: cart.products });
    return await this.getProductsFromCartByID(cid);
  }

  async deleteProductByID(cid, pid) {
  await this.productDBManager.getProductByID(pid); 
  const cart = await this.getProductsFromCartByID(cid); 

  const newProducts = cart.products.filter(item => {
    const productId = item.product._id ? item.product._id.toString() : item.product.toString();
    return productId !== pid;
  });

  await cartModel.updateOne({ _id: cid }, { products: newProducts });

  return await this.getProductsFromCartByID(cid); 
}

  async updateAllProducts(cid, products) {
    for (let key in products) {
      await this.productDBManager.getProductByID(products[key].product);
    }

    await cartModel.updateOne({ _id: cid }, { products });
    return await this.getProductsFromCartByID(cid);
  }

  async updateProductByID(cid, pid, quantity) {
    if (!quantity || isNaN(parseInt(quantity))) {
      throw new Error(`❌ La cantidad ingresada no es válida`);
    }

    await this.productDBManager.getProductByID(pid);
    const cart = await this.getProductsFromCartByID(cid);

    let i = null;
    const result = cart.products.filter((item, index) => {
      if (item.product.toString() === pid) i = index;
      return item.product.toString() === pid;
    });

    if (result.length === 0) {
      throw new Error(`❌ El producto ${pid} no está en el carrito`);
    }

    cart.products[i].quantity = parseInt(quantity);
    await cartModel.updateOne({ _id: cid }, { products: cart.products });

    return await this.getProductsFromCartByID(cid);
  }

  async deleteAllProducts(cid) {
    await cartModel.updateOne({ _id: cid }, { products: [] });
    return await this.getProductsFromCartByID(cid);
  }
}

export { cartDBManager };

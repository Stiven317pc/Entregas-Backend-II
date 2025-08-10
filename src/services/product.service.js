import ProductRepository from '../repositories/product.repository.js';

const productRepo = new ProductRepository();

export default class ProductService {
  async createProduct(data) {
    return await productRepo.createProduct(data);
  }

  async getProducts() {
    return await productRepo.getAllProducts();
  }

  async getProduct(id) {
    return await productRepo.getProductById(id);
  }

  async updateProduct(id, data) {
    return await productRepo.updateProduct(id, data);
  }

  async deleteProduct(id) {
    return await productRepo.deleteProduct(id);
  }
}

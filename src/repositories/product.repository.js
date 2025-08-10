import ProductDAO from '../daos/product.dao.js';

const productDAO = new ProductDAO();

export default class ProductRepository {
  async createProduct(data) {
    return await productDAO.create(data);
  }

  async getAllProducts() {
    return await productDAO.findAll();
  }

  async getProductById(id) {
    return await productDAO.findById(id);
  }

  async updateProduct(id, data) {
    return await productDAO.update(id, data);
  }

  async deleteProduct(id) {
    return await productDAO.delete(id);
  }
}

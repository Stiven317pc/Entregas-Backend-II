import ProductModel from '../models/Product.js';

export default class ProductDAO {
  async create(productData) {
    return ProductModel.create(productData);
  }

  async findAll() {
    return ProductModel.find();
  }

  async findById(id) {
    return ProductModel.findById(id);
  }

  async update(id, updateData) {
    return ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}

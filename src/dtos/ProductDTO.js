export default class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.category = product.category;
    this.thumbnail = Array.isArray(product.thumbnail)
      ? product.thumbnail
      : [product.thumbnail];
  }
}

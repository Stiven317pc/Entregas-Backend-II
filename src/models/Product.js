import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: String,
  code: { type: String, unique: true },
  owner: { type: String, default: 'admin' },
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;

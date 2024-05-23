import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  description: { type: String },
  quantity: { type: Number },
  unity: { type: String },
  priceBought: { type: Number },
  supplier: { type: String },
}, {
  timestamps: true,
});

// Verifica se o modelo já foi definido, caso contrário define um novo modelo
const Product = models.Product || model('Product', ProductSchema);

export default Product;

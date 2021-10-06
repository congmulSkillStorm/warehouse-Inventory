import mongoose from 'mongoose';

import productSchema from './Product.js';
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    warehouseName: { type : String, required: true },
    address: String,
    maxCapacity: { type: Number, required: true },
    currentCapacity: Number,
    product: [productSchema],
    createAt: { type: Date, default: Date.now }
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

export default Warehouse;
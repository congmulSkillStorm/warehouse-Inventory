import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// This is a subdocument schema, it won't become its own model but I'll use it as the schema for the Warehouse's `product` array in Warehouse.js
const productSchema = new Schema({
    productName: { type : String, required: true },
    sqft: Number,
    quantity: Number,
    createAt: { type: Date, default: Date.now }
})

export default productSchema;
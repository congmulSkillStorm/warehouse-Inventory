import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    firstName: { type : String, required: true },
    warehouseName: { type : String, required: true },
    password: { type : String, required: true },
    email: { type : String, required: true },
    createAt: { type: Date, default: Date.now }
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

export default Warehouse;
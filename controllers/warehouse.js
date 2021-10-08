import { Warehouse } from '../models/index.js';

export const getWarehouse = async(warehouseId) => {
    const warehouse = await Warehouse.find({_id: warehouseId});
    return warehouse;
}

export const createProduct = async(productData) => {
    const warehouse = await Warehouse.findByIdAndUpdate(
        {_id: productData.warehouseId},
        { $push: { product: productData}}
        );
    return warehouse;
}
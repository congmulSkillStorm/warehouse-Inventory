import { Warehouse } from '../models/index.js';

export const getWarehouse = async(warehouseId) => {
    const warehouse = await Warehouse.find({_id: warehouseId});
    return warehouse;
}
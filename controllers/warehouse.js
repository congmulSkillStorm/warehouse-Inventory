import { Warehouse } from '../models/index.js';

export const getWarehouse = async(warehouseId) => {
    const warehouse = await Warehouse.find({_id: warehouseId});
    return warehouse;
}

export const createProduct = async(productData) => {
    // Find Warehouse by Id
    // Get currentCapacity
    // Check if the sqft * quantity is over maxCap or not
    // Update it with sqft * quantity
    const warehouse = await Warehouse.find({_id: productData.warehouseId});
    console.log(warehouse, "warehouse")


    let addedCurrentCapacity = warehouse[0].currentCapacity + productData.sqft * productData.quantity;
    
    if(addedCurrentCapacity > warehouse[0].maxCapacity){
        throw new RangeError(`Can not be added greater than ${warehouse[0].maxCapacity} sqft.`)
    }
    console.log("addedCurrentCapacity", addedCurrentCapacity);

    // const warehouse = await Warehouse.findByIdAndUpdate(
    //     {_id: productData.warehouseId},
    //     { $push: { product: productData}}
    //     );
    // return warehouse;

    const response = await Warehouse.findByIdAndUpdate(
        {_id: productData.warehouseId},
        { $set: {currentCapacity: addedCurrentCapacity}, $push: { product: productData}},
        { new: true }
        );
    return response;

    // await Warehouse.findByIdAndUpdate(getAllwarehouses[randomIndex]._id, 
    // { $set: {currentCapacity: addedCurrentCapacity}, $push: {product : product} }
    // )

    // return 1;
}
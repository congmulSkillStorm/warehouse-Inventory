import { Warehouse, Company } from '../models/index.js';

export const getWarehouse = async(warehouseId) => {
    const warehouse = await Warehouse.find({_id: warehouseId});
    return warehouse;
}

export const createProduct = async(productData, childCompanyId) => {
    // Find Warehouse by Id
    // Get currentCapacity
    // Check if the sqft * quantity is over maxCap or not
    // Update it with sqft * quantity

    const warehouse = await Warehouse.find({_id: productData.warehouseId});
    console.log(warehouse, "warehouse")


    let addedCurrentCapacity = warehouse[0].currentCapacity + productData.sqft * productData.quantity;
    console.log("addedCurrentCapacity", addedCurrentCapacity);
    console.log("addedCurrentCapacity", typeof addedCurrentCapacity);
    console.log("warehouse[0].maxCapacity", warehouse[0].maxCapacity);
    console.log("warehouse[0].maxCapacity",typeof warehouse[0].maxCapacity);

    if(addedCurrentCapacity > warehouse[0].maxCapacity){
        throw new RangeError(`Can not be added greater than ${warehouse[0].maxCapacity} sqft.`)
    }
    

    // const warehouse = await Warehouse.findByIdAndUpdate(
    //     {_id: productData.warehouseId},
    //     { $push: { product: productData}}
    //     );
    // return warehouse;

     // Update childCompany's warehouseBasicInfo that has the warehouse.    
     const childCompanyUpdated = await Company.update({'warehouseBasicInfo._id': productData.warehouseId}, 
     {'warehouseBasicInfo.$.currentCapacity': addedCurrentCapacity},
     { new: true });
    //  console.log("childCompanyUpdated", childCompanyUpdated)

    const warehouseUpdated = await Warehouse.findByIdAndUpdate(
        {_id: productData.warehouseId},
        { $set: {currentCapacity: addedCurrentCapacity}, $push: { product: productData}},
        { new: true }
        );

    console.log(childCompanyId, "childCompanyId in Create Product Controller")
    const childCompany = await Company.find({_id: childCompanyId});
    console.log(childCompany, "childCompany");   
    
    console.log("warehouseUpdated", warehouseUpdated)
    return {childCompany, warehouseUpdated};

    // await Warehouse.findByIdAndUpdate(getAllwarehouses[randomIndex]._id, 
    // { $set: {currentCapacity: addedCurrentCapacity}, $push: {product : product} }
    // )

    // return 1;
}

export const deleteProduct = async({productIdarr, warehouseId, childCompanyId}) => {
    console.log(productIdarr, warehouseId, childCompanyId, "productID in deleteProduct controller");
    for(let i = 0; i < productIdarr.length; i++){
        let deleteProduct = await Warehouse.updateOne({'_id': warehouseId}, 
        { $pull: { product: { _id: productIdarr[i]}} }
        );
    }

    // Update Warehouse & Company's warehouseBasicInfo
    const oldwarehouse = await Warehouse.find({'_id': warehouseId});
    // const oldcompany = await Company.find({'_id': childCompanyId});

    let currentCapcity = 0;
    console.log("===============Calculate Current Cap=======================")
    for(let i = 0; i < oldwarehouse[0].product.length; i++){
        currentCapcity += oldwarehouse[0].product[i].sqft * oldwarehouse[0].product[i].quantity;
        console.log(oldwarehouse[0].product[i].sqft, " * ", oldwarehouse[0].product[i].quantity);
    }
    console.log("currentCapcity", currentCapcity);

    const warehouseUpdated = await Warehouse.findByIdAndUpdate(
        {_id: warehouseId},
        { currentCapacity: currentCapcity },
        { new: true }
        );

    const responseChild = await Company.update({'warehouseBasicInfo._id': warehouseId}, 
        {'warehouseBasicInfo.$.currentCapacity': currentCapcity},
        { new: true });    
    
    const childCompanyUpdated = await Company.find({_id: childCompanyId});

    return {childCompanyUpdated, warehouseUpdated};        

}
import { Warehouse, Company } from '../models/index.js';
import mongoose from 'mongoose';

export const getAllWarehouse = async(warehouseId) => {
    const warehouse = await Warehouse.find({});
    return warehouse;
}

export const getWarehouse = async(warehouseId) => {
    const warehouse = await Warehouse.find({_id: warehouseId});
    return warehouse;
}

export const getWarehouseByProductId = async(productId) => {
    const warehouse = await Warehouse.find({"product._id": productId});
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
    // console.log("addedCurrentCapacity", addedCurrentCapacity);
    // console.log("addedCurrentCapacity", typeof addedCurrentCapacity);
    // console.log("warehouse[0].maxCapacity", warehouse[0].maxCapacity);
    // console.log("warehouse[0].maxCapacity",typeof warehouse[0].maxCapacity);

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

    // console.log(childCompanyId, "childCompanyId in Create Product Controller")
    const childCompany = await Company.find({_id: childCompanyId});
    // console.log(childCompany, "childCompany");   
    
    // console.log("warehouseUpdated", warehouseUpdated)
    return {childCompany, warehouseUpdated};

    // await Warehouse.findByIdAndUpdate(getAllwarehouses[randomIndex]._id, 
    // { $set: {currentCapacity: addedCurrentCapacity}, $push: {product : product} }
    // )

    // return 1;
}


export const updateProduct = async (updatedData) => {
    console.log(updatedData," updatedData in Update Product Controller")

    // Check if the updated sqft * quantity is greater than MaxCap
    const warehouse = await Warehouse.find({_id: updatedData.warehouseId});
    const productArr = await Warehouse.find({ 'product._id': updatedData.productId})
    let productDataBeforeUpdpate = [];
    // console.log("============================================================")
    // console.log(productArr);
    for(let i = 0; i < productArr[0].product.length; i++){
        // console.log("=====================in For loop==============================")
        // console.log(productArr[0].product[i]);
        // console.log(productArr[0].product[i]._id.equals(mongoose.Types.ObjectId(updatedData.productId)));
        // console.log(productArr[0].product[i]._id);
        // console.log(mongoose.Types.ObjectId(updatedData.productId));
        if(productArr[0].product[i]._id.equals(mongoose.Types.ObjectId(updatedData.productId))){
            productDataBeforeUpdpate.push(productArr[0].product[i]);
        }
    }
    // console.log("productDataBeforeUpdpate", productDataBeforeUpdpate[0])
    const totalSqftOfProductBeforeUpdated = productDataBeforeUpdpate[0].sqft * productDataBeforeUpdpate[0].quantity;
    let addedCurrentCapacity = (warehouse[0].currentCapacity - totalSqftOfProductBeforeUpdated)+ updatedData.productData.sqft * updatedData.productData.quantity;
    // console.log("addedCurrentCapacity", addedCurrentCapacity);
    // console.log("addedCurrentCapacity", typeof addedCurrentCapacity);
    // console.log("warehouse[0].maxCapacity", warehouse[0].maxCapacity);
    // console.log("warehouse[0].maxCapacity",typeof warehouse[0].maxCapacity);

    if(addedCurrentCapacity > warehouse[0].maxCapacity || addedCurrentCapacity == NaN){
        throw new RangeError(`Can not be added greater than ${warehouse[0].maxCapacity} sqft.`)
    }


    await Warehouse.updateOne({ 'product._id': updatedData.productId},
                        // { 'product': updatedData.productData}
                        {'$set': { 'product.$.productName': updatedData.productData.productName,
                                 'product.$.color': updatedData.productData.color,
                                 'product.$.price': updatedData.productData.price,
                                 'product.$.quantity': updatedData.productData.quantity,
                                 'product.$.sqft': updatedData.productData.sqft}
                        }
    )

    // Update Warehouse & Company's warehouseBasicInfo
    const oldwarehouse = await Warehouse.find({'_id': updatedData.warehouseId});

    let currentCapcity = 0;
    // console.log("===============Calculate Current Cap=======================")
    for(let i = 0; i < oldwarehouse[0].product.length; i++){
        currentCapcity += oldwarehouse[0].product[i].sqft * oldwarehouse[0].product[i].quantity;
        // console.log(oldwarehouse[0].product[i].sqft, " * ", oldwarehouse[0].product[i].quantity);
    }
    // console.log("currentCapcity", currentCapcity);

    const warehouseUpdated = await Warehouse.findByIdAndUpdate(
        {_id: updatedData.warehouseId},
        { currentCapacity: currentCapcity },
        { new: true }
        );

    const responseChild = await Company.update({'warehouseBasicInfo._id': updatedData.warehouseId}, 
        {'warehouseBasicInfo.$.currentCapacity': currentCapcity},
        { new: true });    
    
    const childCompanyUpdated = await Company.find({_id: updatedData.childCompanyId});

    return {childCompanyUpdated, warehouseUpdated};   
}

export const deleteProduct = async({productIdarr, warehouseId, childCompanyId}) => {
    // console.log(productIdarr, warehouseId, childCompanyId, "productID in deleteProduct controller");
    for(let i = 0; i < productIdarr.length; i++){
        let deleteProduct = await Warehouse.updateOne({'_id': warehouseId}, 
        { $pull: { product: { _id: productIdarr[i]}} }
        );
    }

    // Update Warehouse & Company's warehouseBasicInfo
    const oldwarehouse = await Warehouse.find({'_id': warehouseId});
    // const oldcompany = await Company.find({'_id': childCompanyId});

    let currentCapcity = 0;
    // console.log("===============Calculate Current Cap=======================")
    for(let i = 0; i < oldwarehouse[0].product.length; i++){
        currentCapcity += oldwarehouse[0].product[i].sqft * oldwarehouse[0].product[i].quantity;
        // console.log(oldwarehouse[0].product[i].sqft, " * ", oldwarehouse[0].product[i].quantity);
    }
    // console.log("currentCapcity", currentCapcity);

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
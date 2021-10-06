import mongoose from 'mongoose';
import { Company, Warehouse } from '../models/index.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const warehouseSeed = [
    {
        warehouseName: "warehouse A",
        address: "address",
        maxCapacity: 1000,
        currentCapacity: 10,
        product: [
            {
                productName: "product01",
                sqft: 10,
                quantity: 3,
            },
            {
                productName: "product02",
                sqft: 5,
                quantity: 10,
            },
            {
                productName: "product03",
                sqft: 20,
                quantity: 1,
            },
        ],
    },
    {
        warehouseName: "warehouse B",
        address: "address",
        maxCapacity: 1200,
        currentCapacity: 500,
        product: [
            {
                productName: "product01",
                sqft: 20,
                quantity: 3,
            },
            {
                productName: "product02",
                sqft: 2,
                quantity: 15,
            },
            {
                productName: "product03",
                sqft: 5,
                quantity: 3,
            },
        ],
    },
]

async function runSeed() {
    try{
        let count = 0;
        await Warehouse.deleteMany({});
        for( const warehouse of warehouseSeed ){
            let newWarehouse = await new Warehouse(warehouse).save();
            
            await Company.findByIdAndUpdate('615da5fd2d13eafc0711bc72', {$push: {warehouse : newWarehouse._id}})
            await Company.findByIdAndUpdate('615da5fd2d13eafc0711bc72', {$push: {warehouseBasicInfo: {warehouseName : newWarehouse.warehouseName, maxCapacity:newWarehouse.maxCapacity, currentCapacity: newWarehouse.currentCapacity}}})
            count++;
        }
        console.log(count+ " records inserted!");
        mongoose.connection.close();
        process.exit(0);
    }catch(err) {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    }
}

runSeed();
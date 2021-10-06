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

const warehouseSeedv2 = [{
    "warehouseName": "warehouse-Y-find",
    "address": "6 Katie Trail",
    "maxCapacity": 8242,
    "currentCapacity": 844
  }, {
    "warehouseName": "warehouse-Overhold",
    "address": "57 Eagle Crest Hill",
    "maxCapacity": 6377,
    "currentCapacity": 725
  }, {
    "warehouseName": "warehouse-Zoolab",
    "address": "55692 Thierer Avenue",
    "maxCapacity": 6210,
    "currentCapacity": 3977
  }, {
    "warehouseName": "warehouse-Stim",
    "address": "792 Carpenter Park",
    "maxCapacity": 9557,
    "currentCapacity": 4735
  }, {
    "warehouseName": "warehouse-Flowdesk",
    "address": "63243 Elmside Junction",
    "maxCapacity": 8177,
    "currentCapacity": 500
  }, {
    "warehouseName": "warehouse-Bitchip",
    "address": "22995 Ruskin Hill",
    "maxCapacity": 9222,
    "currentCapacity": 3485
  }, {
    "warehouseName": "warehouse-It",
    "address": "44 Mesta Place",
    "maxCapacity": 6966,
    "currentCapacity": 1547
  }, {
    "warehouseName": "warehouse-Treeflex",
    "address": "0 Artisan Plaza",
    "maxCapacity": 6068,
    "currentCapacity": 3624
  }, {
    "warehouseName": "warehouse-Zaam-Dox",
    "address": "4 Banding Junction",
    "maxCapacity": 8107,
    "currentCapacity": 3050
  }, {
    "warehouseName": "warehouse-Tin",
    "address": "71 Meadow Valley Road",
    "maxCapacity": 9359,
    "currentCapacity": 2187
  }]

async function runSeed() {
    try{
        let count = 0;
        await Warehouse.deleteMany({});
        let getAllcompanies = await Company.find({});
        console.log(getAllcompanies);
        // console.log(Math.floor(Math.random() * 10 + 1));
        for( const warehouse of warehouseSeedv2 ){
            let newWarehouse = await new Warehouse(warehouse).save();
            let randomIndex = Math.floor(Math.random() * 10 + 1);
            await Company.findByIdAndUpdate(getAllcompanies[randomIndex]._id, {$push: {warehouse : newWarehouse._id}})
            await Company.findByIdAndUpdate(getAllcompanies[randomIndex]._id, {$push: { warehouseBasicInfo: {_id: newWarehouse._id, warehouseName : newWarehouse.warehouseName, maxCapacity:newWarehouse.maxCapacity, currentCapacity: newWarehouse.currentCapacity}}})
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
import mongoose from 'mongoose';
import { Company } from '../models/index.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory-v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function runSeed() { 
    try{
        let allCompanieswithWarehouse = await Company.find({}).populate('warehouse');
        // console.log(allCompanieswithWarehouse);
        // allCompanieswithWarehouse.forEach(company => {
        //     company.warehouse.forEach(async (ware) => {
        //         console.log(ware._id);
        //         console.log(ware.currentCapacity);
        //         const responase = await Company.updateOne({'warehouseBasicInfo._id': ware._id}, {'warehouseBasicInfo.$.currentCapacity': ware.currentCapacity}, { new: true });
        //         // await Company.update({'warehouseBasicInfo._id': "61635acea775f4717726c059"}, {'warehouseBasicInfo.$.currentCapacity': 10});
            
        //         console.log("======================================", responase, "======================================");
        //     })
        // })
        let warehouseArr = [];
        for(let i = 0; i < allCompanieswithWarehouse.length; i++){
            warehouseArr = [...warehouseArr, ...allCompanieswithWarehouse[i].warehouse];
        }

        // console.log(warehouseArr);

        for(let i = 0; i < warehouseArr.length; i++){
            console.log(warehouseArr[i]._id);
            await Company.updateOne({'warehouseBasicInfo._id': warehouseArr[i]._id}, {'warehouseBasicInfo.$.currentCapacity': warehouseArr[i].currentCapacity});
        }

        mongoose.connection.close();
        process.exit(1);

    }catch(err) {
        console.log(err);
        mongoose.connection.close();
        process.exit(1);
    }

}

runSeed();
import mongoose from 'mongoose';
import { Company, Warehouse } from '../models/index.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function runSeed() {
    try{
        let allCompanieswithWarehouse = await Company.find({}).populate('warehouse');

        allCompanieswithWarehouse.forEach(company => {
            company.warehouse.forEach(async (ware) => {
                console.log(ware._id);
                console.log(ware.currentCapacity);
                await Company.update({'warehouseBasicInfo._id': ware._id}, {'warehouseBasicInfo.$.currentCapacity': ware.currentCapacity});
            })
        })
        mongoose.connection.close();
        process.exit(1);

    }catch(err) {
        console.log(err);
        mongoose.connection.close();
        process.exit(1);
    }
}

runSeed();

// Company.update({'warehouseBasicInfo._id': ''}, {warehouseBasicInfo.currentCapacity: ''})
// {
//     _id: new ObjectId("615e33134b4b8a7fcf200f49"),
//     companyName: 'Meeveo',
//     password: '$2b$10$yEyVQ0r8oLISGf3Sog3st.zu16EcFkTfOo/L6cB4iduh8r.OOigjO',
//     email: 'jbakey2@craigslist.org',
//     location: 'Virginia',
//     warehouse: [
//       {
//         _id: new ObjectId("615e33656f9fb81e2b8d179a"),
//         warehouseName: 'warehouse-Sonsing',
//         address: '48 Kings Trail',
//         maxCapacity: 5751,
//         currentCapacity: 600,
//         product: [Array],
//         createAt: 2021-10-06T23:38:13.856Z,
//         __v: 0
//       },
//       {
//         _id: new ObjectId("615e33656f9fb81e2b8d17f6"),
//         warehouseName: 'warehouse-Tresom',
//         address: '335 Boyd Crossing',
//         maxCapacity: 7767,
//         currentCapacity: 38,
//         product: [Array],
//         createAt: 2021-10-06T23:38:13.977Z,
//         __v: 0
//       },
//       {
//         _id: new ObjectId("615e33656f9fb81e2b8d17fa"),
//         warehouseName: 'warehouse-Fix San',
//         address: '70436 Memorial Hill',
//         maxCapacity: 8196,
//         currentCapacity: 168,
//         product: [Array],
//         createAt: 2021-10-06T23:38:13.981Z,
//         __v: 0
//       },
//       {
//         _id: new ObjectId("615e33656f9fb81e2b8d17fe"),
//         warehouseName: 'warehouse-Flowdesk',
//         address: '150 Sherman Hill',
//         maxCapacity: 6097,
//         currentCapacity: 414,
//         product: [Array],
//         createAt: 2021-10-06T23:38:13.986Z,
//         __v: 0
//       },
//       {
//         _id: new ObjectId("615e33656f9fb81e2b8d1806"),
//         warehouseName: 'warehouse-Fix San',
//         address: '7534 Del Sol Road',
//         maxCapacity: 7713,
//         currentCapacity: 42,
//         product: [Array],
//         createAt: 2021-10-06T23:38:13.994Z,
//         __v: 0
//       }
//     ],
//     warehouseBasicInfo: [
//       {
//         _id: '615e33656f9fb81e2b8d179a',
//         warehouseName: 'warehouse-Sonsing',
//         maxCapacity: 5751,
//         currentCapacity: 0
//       },
//       {
//         _id: '615e33656f9fb81e2b8d17f6',
//         warehouseName: 'warehouse-Tresom',
//         maxCapacity: 7767,
//         currentCapacity: 0
//       },
//       {
//         _id: '615e33656f9fb81e2b8d17fa',
//         warehouseName: 'warehouse-Fix San',
//         maxCapacity: 8196,
//         currentCapacity: 0
//       },
//       {
//         _id: '615e33656f9fb81e2b8d17fe',
//         warehouseName: 'warehouse-Flowdesk',
//         maxCapacity: 6097,
//         currentCapacity: 0
//       },
//       {
//         _id: '615e33656f9fb81e2b8d1806',
//         warehouseName: 'warehouse-Fix San',
//         maxCapacity: 7713,
//         currentCapacity: 0
//       }
//     ],
//   }
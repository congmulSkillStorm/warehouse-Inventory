import mongoose from 'mongoose';
import { Company, Warehouse } from '../models/index.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory-v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const warehouseSeedv3 = [{"warehouseName":"warehouse-Andalax","address":"84509 Logan Hill","maxCapacity":7193},
{"warehouseName":"warehouse-Greenlam","address":"9 Elka Road","maxCapacity":7141},
{"warehouseName":"warehouse-Zoolab","address":"10 Forest Run Pass","maxCapacity":6174},
{"warehouseName":"warehouse-Andalax","address":"8086 Cascade Drive","maxCapacity":7147},
{"warehouseName":"warehouse-Otcom","address":"8 Bluestem Trail","maxCapacity":9326},
{"warehouseName":"warehouse-Sonsing","address":"48 Kings Trail","maxCapacity":5751},
{"warehouseName":"warehouse-Andalax","address":"55846 Holmberg Parkway","maxCapacity":9351},
{"warehouseName":"warehouse-Cardify","address":"7 Old Gate Drive","maxCapacity":7292},
{"warehouseName":"warehouse-Vagram","address":"2 Browning Crossing","maxCapacity":7351},
{"warehouseName":"warehouse-Zontrax","address":"2 Helena Junction","maxCapacity":9283},
{"warehouseName":"warehouse-Holdlamis","address":"71256 Trailsway Parkway","maxCapacity":7854},
{"warehouseName":"warehouse-Ronstring","address":"64 Merry Center","maxCapacity":5848},
{"warehouseName":"warehouse-Sonsing","address":"8931 Bunker Hill Plaza","maxCapacity":7818},
{"warehouseName":"warehouse-Rank","address":"390 Hallows Junction","maxCapacity":5278},
{"warehouseName":"warehouse-Sonair","address":"479 Carpenter Alley","maxCapacity":7164},
{"warehouseName":"warehouse-Sonair","address":"840 Troy Lane","maxCapacity":6385},
{"warehouseName":"warehouse-Y-find","address":"84415 Burning Wood Crossing","maxCapacity":6671},
{"warehouseName":"warehouse-Zoolab","address":"69881 Lindbergh Junction","maxCapacity":6885},
{"warehouseName":"warehouse-Mat Lam Tam","address":"90 Northport Avenue","maxCapacity":6494},
{"warehouseName":"warehouse-Lotlux","address":"7 Hayes Junction","maxCapacity":8287},
{"warehouseName":"warehouse-Pannier","address":"20182 Mesta Place","maxCapacity":5401},
{"warehouseName":"warehouse-Konklux","address":"2 Kenwood Plaza","maxCapacity":5291},
{"warehouseName":"warehouse-Stronghold","address":"360 Kipling Terrace","maxCapacity":8457},
{"warehouseName":"warehouse-Asoka","address":"03388 Roth Point","maxCapacity":7189},
{"warehouseName":"warehouse-Wrapsafe","address":"64892 Derek Court","maxCapacity":5678},
{"warehouseName":"warehouse-Keylex","address":"46 Memorial Crossing","maxCapacity":7081},
{"warehouseName":"warehouse-Sonsing","address":"2 Russell Court","maxCapacity":8890},
{"warehouseName":"warehouse-Stronghold","address":"36562 Northview Lane","maxCapacity":8074},
{"warehouseName":"warehouse-Tresom","address":"335 Boyd Crossing","maxCapacity":7767},
{"warehouseName":"warehouse-Fix San","address":"70436 Memorial Hill","maxCapacity":8196},
{"warehouseName":"warehouse-Flowdesk","address":"150 Sherman Hill","maxCapacity":6097},
{"warehouseName":"warehouse-Zamit","address":"8540 Sage Hill","maxCapacity":6311},
{"warehouseName":"warehouse-Fix San","address":"7534 Del Sol Road","maxCapacity":7713},
{"warehouseName":"warehouse-Transcof","address":"8 Clove Park","maxCapacity":6301},
{"warehouseName":"warehouse-Bigtax","address":"5320 Linden Street","maxCapacity":5523},
{"warehouseName":"warehouse-Stim","address":"00408 Old Gate Lane","maxCapacity":7457},
{"warehouseName":"warehouse-Zaam-Dox","address":"4687 Division Circle","maxCapacity":6438},
{"warehouseName":"warehouse-Prodder","address":"2292 Northwestern Parkway","maxCapacity":8178},
{"warehouseName":"warehouse-Prodder","address":"49 Anniversary Lane","maxCapacity":8466},
{"warehouseName":"warehouse-Tin","address":"6451 Miller Point","maxCapacity":8796},
{"warehouseName":"warehouse-Cardguard","address":"22 Harbort Place","maxCapacity":6678},
{"warehouseName":"warehouse-Bamity","address":"276 Dixon Trail","maxCapacity":8053},
{"warehouseName":"warehouse-Aerified","address":"063 Maple Way","maxCapacity":6391},
{"warehouseName":"warehouse-Subin","address":"02 Dovetail Road","maxCapacity":9651},
{"warehouseName":"warehouse-Lotlux","address":"13 Schmedeman Trail","maxCapacity":8666},
{"warehouseName":"warehouse-Duobam","address":"43325 Lerdahl Drive","maxCapacity":7366},
{"warehouseName":"warehouse-Greenlam","address":"48 Monument Court","maxCapacity":7173},
{"warehouseName":"warehouse-Sonsing","address":"95 Kedzie Hill","maxCapacity":5067},
{"warehouseName":"warehouse-Overhold","address":"653 Hoffman Pass","maxCapacity":6849},
{"warehouseName":"warehouse-Konklux","address":"98490 Hansons Trail","maxCapacity":5900}]

async function runSeed() {
    try{
        let count = 0;
        await Warehouse.deleteMany({});
        let getAllcompanies = await Company.find({});
        // console.log(getAllcompanies);
        for( const warehouse of warehouseSeedv3 ){
            let newWarehouse = await new Warehouse(warehouse).save();
            let randomIndex = Math.floor(Math.random() * getAllcompanies.length);
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
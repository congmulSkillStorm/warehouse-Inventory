import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { ParentCompany } from '../models/index.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory-v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const parentCompaniesSeed = [
    {
        companyName: "skillstorm",
        password: "123",
        email: "jjung@skillstorm.com",
        isMasterUser: true,
        isParentCompany: true,
        location: 'Florida'
    }
]

async function runSeed() {
    try{
        let count = 0;
        await ParentCompany.deleteMany({});
        for( const parentCompany of parentCompaniesSeed ){
            count++;

            await new ParentCompany(parentCompany).save();
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
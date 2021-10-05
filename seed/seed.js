import mongoose from 'mongoose';
import { Company } from '../models/index.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const companiesSeed = [
    {
        companyName: "skillstorm",
        password: "123",
        email: "jjung@skillstorm.com",
        isMasterUser: true,
        isParentCompany: true,
    },
    {
        companyName: "childcompany",
        password: "123",
        email: "jjung@childCompany.com",
        isMasterUser: false,
        isParentCompany: false,
    }
]

async function runSeed() {
    try{
        let count = 0;
        await Company.deleteMany({});
        for( const company of companiesSeed ){
            count++;
            await new Company(company).save();
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
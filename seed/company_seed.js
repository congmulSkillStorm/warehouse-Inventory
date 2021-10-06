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
        location: 'Florida'
    },
    {
        companyName: "childcompanyA",
        password: "123",
        email: "jjung@childCompanyA.com",
        isMasterUser: false,
        isParentCompany: false,
        location: 'Washinton'
    },
    {
        companyName: "childcompanyB",
        password: "123",
        email: "jjung@childCompanyB.com",
        iBMasterUser: false,
        isParentCompany: false,
        location: 'Kansas'
    },
    {
        companyName: "childcompanyC",
        password: "123",
        email: "jjung@childCompanyC.com",
        isMasterUser: false,
        isParentCompany: false,
        location: 'Texas'
    },
    {
        companyName: "childcompanyD",
        password: "123",
        email: "jjung@childCompanyD.com",
        isMasterUser: false,
        isParentCompany: false,
        location: 'Arizona'
    },
    {
        companyName: "childcompanyE",
        password: "123",
        email: "jjung@childCompanyE.com",
        isMasterUser: false,
        isParentCompany: false,
        location: 'Ohio'
    },
    {
        companyName: "childcompanyF",
        password: "123",
        email: "jjung@childCompanyF.com",
        isMasterUser: false,
        isParentCompany: false,
        location: 'Idaho'
    },
    {
        companyName: "childcompanyG",
        password: "123",
        email: "jjung@childCompanyG.com",
        isMasterUser: false,
        isParentCompany: false,
        location: 'Georgia'
    }
]

async function runSeed() {
    try{
        let masterUserId;
        let count = 0;
        await Company.deleteMany({});
        for( const company of companiesSeed ){
            count++;
            console.log(company);
            let newCompany = await new Company(company).save();

            if(newCompany.isParentCompany){
                masterUserId = newCompany._id;
            }

            if(!newCompany.isParentCompany){
                await Company.findByIdAndUpdate(masterUserId, {$push: {childCompany : newCompany._id}})
            }
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
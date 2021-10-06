import mongoose from 'mongoose';
import { Company, ParentCompany } from '../models/index.js';

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

const companiesSeedv2 = [
    {"companyName":"Zoonder","password":"DCISKGM","email":"sfleetham0@wix.com","location":"Louisiana"},
    {"companyName":"Youtags","password":"OtrslIl","email":"ablondin1@wordpress.com","location":"Ohio"},
    {"companyName":"Meeveo","password":"QbftGpt6eZV","email":"jbakey2@craigslist.org","location":"Virginia"},
    {"companyName":"Plajo","password":"7qvup727","email":"cdowzell3@blogspot.com","location":"Kentucky"},
    {"companyName":"Yata","password":"cPMRAe","email":"jbesque4@census.gov","location":"California"},
    {"companyName":"Thoughtsphere","password":"gZNG4uYO","email":"ymargiotta5@studiopress.com","location":"Ohio"},
    {"companyName":"Youopia","password":"dMUSnu","email":"alinke6@deviantart.com","location":"New York"},
    {"companyName":"Buzzster","password":"qc8bd3sDEODC","email":"kludwikiewicz7@webnode.com","location":"Michigan"},
    {"companyName":"Skiptube","password":"sjM9JpY","email":"acavanaugh8@rakuten.co.jp","location":"Washington"},
    {"companyName":"Fivebridge","password":"v4gXrgh3ll","email":"nnannoni9@accuweather.com","location":"California"}]
async function runSeed() {
    try{
        let parentCompanies = await ParentCompany.find();
        let masterUserId;
        parentCompanies.forEach(parentCompany => {
            if(parentCompany.isMasterUser){
                masterUserId = parentCompany._id;
            }
        })

        let count = 0;
        await Company.deleteMany({});
        for( const company of companiesSeedv2 ){
            count++;

            // Create Child Company
            let newCompany = await new Company(company).save();
            
            // Add Child Company to MasterUser of Parent Company
            await ParentCompany.findByIdAndUpdate(masterUserId, {$push: {childCompany : newCompany._id}})
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
import mongoose from 'mongoose';
import { Company, ParentCompany } from '../models/index.js';

import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory-v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const companiesSeedv2 = [
    {"companyName":"ChildCom","password":"123","email":"childCom@childCom.com","location":"WA"},
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
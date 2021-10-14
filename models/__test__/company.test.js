import mongoose from 'mongoose';
import { Company, Warehouse } from '../index';

const mongoUrl = 'mongodb://localhost/test_warehouse-inventory';

const dummyCompany = {
    companyName: "childCom",
    email: "jjung@childCom",
    password: "password",
    location: 'WA',
}

const dummyWarehouse ={
    warehouseName: "myWarehouse",
    address: "123 Lindsay AVE",
    maxCapacity: 1000,
    currentCapacity: 500,
    product: [{
        productName: "myProduct",
        sqft: 10,
        quantity: 250,
        color: "Black",
        price: 250000,
    }]
}

beforeAll(async () => {
    await mongoose.connect(mongoUrl);
    await Company.deleteMany({});
    await Warehouse.deleteMany({});
})

afterEach(async () => {
    await Company.deleteMany({});
    await Warehouse.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe('Company model test', () => {
    it('Should create a Company', async () => {
        await new Company(dummyCompany).save();
        const expected = 1;

        const response = await Company.countDocuments();
        const actual = response;

        expect(actual).toBe(expected);
    });

    it('Should get a company ', async () => {
        const newCompany = await new Company(dummyCompany).save();
        const expected = newCompany._id;

        const getCompany = await Company.findOne({_id: newCompany._id});
        const actual = getCompany._id;

        expect(actual).toEqual(expected);
    });

    it('Should add a warehouse', async () => {
        const newCompany = await new Company(dummyCompany).save();
        const newWarehouse = await new Warehouse(dummyWarehouse).save();
        const expected = newWarehouse._id;

        const updatedCompany = await Company.findByIdAndUpdate(newCompany._id, 
            { $push: { warehouse: newWarehouse._id }}, 
            { new: true });    
        
        // console.log(updatedCompany);
        let actual = updatedCompany.warehouse[0]._id;

        expect(actual).toEqual(expected);
    });

    it('Should populate warehouse', async () => {
        const newCompany = await new Company(dummyCompany).save();
        const newWarehouse = await new Warehouse(dummyWarehouse).save();
        const expected = dummyWarehouse.product[0].productName;

        const updatedCompany = await Company.findByIdAndUpdate(newCompany._id, 
            { $push: { warehouse: newWarehouse._id }}, 
            { new: true });    

        const populateCompany = await Company.find({_id: newCompany._id}).populate('warehouse');
        // console.log(populateCompany[0].warehouse[0].product[0].productName);
        let actual = populateCompany[0].warehouse[0].product[0].productName;

        expect(actual).toEqual(expected);
    });



    it('Can encrypt password', async() => {
        const expected = 'password';

        const newCompany = await new Company(dummyCompany).save();
        const actual = newCompany.password;

        expect(actual).not.toEqual(expected);
    });

    it('Can compare company password with a hash password', async() => {
        const expected = true;

        const newCompany = await new Company(dummyCompany).save();
        const actual = await newCompany.isCorrectPassword('password');

        expect(actual).toEqual(expected);
    });

});


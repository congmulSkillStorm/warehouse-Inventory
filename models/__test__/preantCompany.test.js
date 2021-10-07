import mongoose from 'mongoose';
import { ParentCompany } from '../index';

const mongoUrl = 'mongodb://localhost/test_warehouse-inventory';


const dummyCompany = {
    companyName: "skillstorm",
    password: "123",
    email: "jjung@skillstorm.com",
    isMasterUser: true,
    isParentCompany: true,
    location: 'Florida'
}

beforeAll(async () => {
    await mongoose.connect(mongoUrl);
    await ParentCompany.deleteMany({});
})

afterEach(async () => {
    await ParentCompany.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe('Company model test', () => {
    it('Should create a Company', async () => {
        await new ParentCompany(dummyCompany).save();
        const expected = 1;

        const response = await ParentCompany.countDocuments();
        const actual = response;

        expect(actual).toBe(expected);
    });

    it('Should get a company ', async () => {
        const newCompany = await new ParentCompany(dummyCompany).save();
        const expected = newCompany._id;
        console.log(newCompany);
        const getCompany = await ParentCompany.findOne({email: newCompany.email});
        const actual = getCompany._id;
        console.log(getCompany);
        expect(actual).toEqual(expected);
    });
});
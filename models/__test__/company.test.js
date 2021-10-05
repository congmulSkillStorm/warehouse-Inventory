import mongoose from 'mongoose';
import { Company } from '../index';

const mongoUrl = 'mongodb://localhost/test_warehouse-inventory';

const dummyCompany = {
    companyName: "skillstorm",
    email: "jjung@skillstorm",
    password: "password",
    isMasterUser: true,
    isParentCompany: true,
    location: null,
}

beforeAll(async () => {
    await mongoose.connect(mongoUrl);
    await Company.deleteMany({});
})

afterEach(async () => {
    await Company.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe('Company model test', () => {
    it('Can create a Company', async () => {
        await new Company(dummyCompany).save();
        const expected = 1;

        const response = await Company.countDocuments();
        const actual = response;

        expect(actual).toBe(expected);
    });
});


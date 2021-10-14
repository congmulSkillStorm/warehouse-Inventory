import mongoose from 'mongoose';
import { ParentCompany, Company } from '../index';

const mongoUrl = 'mongodb://localhost/test_warehouse-inventory';


const dummyCompany = {
    companyName: "skillstorm",
    password: "password",
    email: "jjung@skillstorm.com",
    isMasterUser: true,
    isParentCompany: true,
    location: 'Florida'
}

beforeAll(async () => {
    await mongoose.connect(mongoUrl);
    await ParentCompany.deleteMany({});
    await Company.deleteMany({});
})

afterEach(async () => {
    await ParentCompany.deleteMany({});
    await Company.deleteMany({});
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
        // console.log(newCompany);
        const getCompany = await ParentCompany.findOne({email: newCompany.email});
        const actual = getCompany._id;
        // console.log(getCompany);
        expect(actual).toEqual(expected);
    });


    it('Should add Child Company', async () =>{
        const newCompany = await new ParentCompany(dummyCompany).save();
        const newChildCom = await new Company(dummyCompany).save();
        const expected = newChildCom._id;
        let actual;

        if(newCompany.isParentCompany){
            const updatedCompany = await ParentCompany.findByIdAndUpdate(newCompany._id, 
                { $push: { childCompany: newChildCom._id }}, 
                { new: true });     //  If you set new: true, findOneAndUpdate() will instead give you the object after update was applied
            // console.log(updatedCompany);
            actual = updatedCompany.childCompany[0]._id;
        }
        expect(actual).toEqual(expected);
    });


    it('Should populate Child Company', async () =>{
        const newCompany = await new ParentCompany(dummyCompany).save();
        const newChildCom = await new Company(dummyCompany).save();
        const expected = newChildCom._id;
        let actual;
        if(newCompany.isParentCompany){
            await ParentCompany.findByIdAndUpdate(newCompany._id, 
                { $push: { childCompany: newChildCom._id }}, 
                { new: true });     //  If you set new: true, findOneAndUpdate() will instead give you the object after update was applied
        }

        const populateCompany = await ParentCompany.find({_id: newCompany._id}).populate('childCompany');
        // console.log(populateCompany);
        actual = populateCompany[0].childCompany[0]._id;

        expect(actual).toEqual(expected);
    });

    it('Can encrypt password', async() => {
        const expected = 'password';

        const newCompany = await new ParentCompany(dummyCompany).save();
        const actual = newCompany.password;

        expect(actual).not.toEqual(expected);
    });

    it('Can compare company password with a hash password', async() => {
        const expected = true;

        const newCompany = await new ParentCompany(dummyCompany).save();
        const actual = await newCompany.isCorrectPassword('password');

        expect(actual).toEqual(expected);
    });
});
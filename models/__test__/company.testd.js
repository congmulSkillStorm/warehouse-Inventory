// import mongoose from 'mongoose';
// import { Company } from '../index';

// const mongoUrl = 'mongodb://localhost/test_warehouse-inventory';

// const dummyCompany = {
//     companyName: "skillstorm",
//     email: "jjung@skillstorm",
//     password: "password",
//     isMasterUser: true,
//     isParentCompany: true,
//     location: null,
// }

// beforeAll(async () => {
//     await mongoose.connect(mongoUrl);
//     await Company.deleteMany({});
// })

// afterEach(async () => {
//     await Company.deleteMany({});
// });

// afterAll(async () => {
//     await mongoose.connection.close();
// });


// describe('Company model test', () => {
//     it('Should create a Company', async () => {
//         await new Company(dummyCompany).save();
//         const expected = 1;

//         const response = await Company.countDocuments();
//         const actual = response;

//         expect(actual).toBe(expected);
//     });

//     it('Should get a company ', async () => {
//         const newCompany = await new Company(dummyCompany).save();
//         const expected = newCompany._id;

//         const getCompany = await Company.findOne({_id: newCompany._id});
//         const actual = getCompany._id;

//         expect(actual).toEqual(expected);
//     });

//     it('Should add Child Company if it is in the Parent Company', async () =>{
//         const newCompany = await new Company(dummyCompany).save();
//         const expected = newCompany._id;
//         let actual;

//         if(newCompany.isParentCompany){
//             const updatedCompany = await Company.findByIdAndUpdate(newCompany._id, 
//                 { $push: { childCompany: newCompany._id }}, 
//                 { new: true });     //  If you set new: true, findOneAndUpdate() will instead give you the object after update was applied
//             actual = updatedCompany.childCompany[0];
//         }
//         expect(actual).toEqual(expected);
//     });

//     it('Should populate Child Company', async () =>{
//         const newCompany = await new Company(dummyCompany).save();
//         const expected = newCompany._id;
//         let actual;

//         if(newCompany.isParentCompany){
//             const updatedCompany = await Company.findByIdAndUpdate(newCompany._id, 
//                 { $push: { childCompany: newCompany._id }}, 
//                 { new: true });     //  If you set new: true, findOneAndUpdate() will instead give you the object after update was applied 
//         }

//         const populateCompany = await Company.find({_id: newCompany._id}).populate('childCompany');
//         actual = populateCompany[0].childCompany[0]._id;

//         expect(actual).toEqual(expected);
//     });



//     it('Can encrypt password', async() => {
//         const expected = 'password';

//         const newCompany = await new Company(dummyCompany).save();
//         const actual = newCompany.password;

//         expect(actual).not.toEqual(expected);
//     });

//     it('Can compare company password with a hash password', async() => {
//         const expected = true;

//         const newCompany = await new Company(dummyCompany).save();
//         const actual = await newCompany.isCorrectPassword('password');

//         expect(actual).toEqual(expected);
//     });

// });


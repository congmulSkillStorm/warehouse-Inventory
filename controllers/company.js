import { ParentCompany, Company } from '../models/index.js';

export const createCompany = async (companyData) => {
    // TODO: Validation

    return await Company.create(companyData);
}

export const loginCompany = async ({ inputCompanyName="skillstorm", inputPassword, inputEmail=null}) => {
   console.log(inputCompanyName, inputEmail, inputPassword);
    let company;
    if(inputEmail){
        console.log(inputEmail);
        try {
            company = await ParentCompany.findone({ company: 'skillstorm' });
            console.log(company);
        }catch(err) {
            console.log(err);
        }
    }else{
        try {
            console.log(inputCompanyName);
            company = await Company.findOne({ companyName: inputCompanyName});
            console.log(company);
        }catch(err) {
            console.log(err)
        }

    }

    if(!company){
        throw { message: 'No company account found!'};
    }

    const validPassword = await company.isCorrectPassword(inputPassword);
    // console.log("validPassword", validPassword);
    
    if(!validPassword){
        throw { message: 'Incorrect credentials' };
    }

    return company;
}

export const getChildCompanies = async (companyId) => {
    // TODO: Validation - If it is parentCompany or not. 
    const populateCompany = await ParentCompany.find({_id: companyId}).populate('childCompany');
    return populateCompany;
}
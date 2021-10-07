import { ParentCompany, Company } from '../models/index.js';

export const createCompany = async (companyData) => {
    // TODO: Validation

    return await Company.create(companyData);
}

export const loginCompany = async ({ inputCompanyName="skillstorm", inputPassword, inputEmail=null}) => {
    let company;
    if(inputEmail){
        try {
            let response = await ParentCompany.find({email: inputEmail});
            company = response[0];
        }catch(err) {
            console.log(err);
        }
    }else{
        try {
            company = await Company.findOne({ companyName: inputCompanyName});
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
import { Company } from '../models/index.js';

export const createCompany = async (companyData) => {
    // TODO: Validation

    return await Company.create(companyData);
}

export const loginCompany = async ({ inputCompanyName, inputPassword, inputEmail=null}) => {
    console.log("loginCompany controller ", inputCompanyName, inputPassword, inputEmail);
    const company = await Company.findOne({ companyName: inputCompanyName});
    console.log(company);

    if(!company){
        throw { message: 'No company account found!'};
    }

    const validPassword = await company.isCorrectPassword(inputPassword);
    console.log("validPassword", validPassword);
    
    if(!validPassword){
        throw { message: 'Incorrect credentials' };
    }

    return company;
}
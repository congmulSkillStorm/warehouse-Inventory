import { Company } from '../models/index.js';

export const createCompany = async (companyData) => {
    console.log("In controller", companyData);
    
    return await Company.create(userData);
}
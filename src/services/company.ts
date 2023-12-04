import mongoose from "mongoose"
import Company from "../models/Company"
import { ICompanyInput, ICompanyLogin } from "../models/interfaces/company"
import bcrypt from 'bcrypt'
import { generateToken } from "../utility/jwt";
import Logging from "../library/logging";

const createCompany = async (com: ICompanyInput) => {
    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        name: com.name,
        website: com.website,
        address: com.address,
        email: com.email,
        phoneNumber: com.phoneNumber,
        password: await bcrypt.hash(com.password, 10)
    })
    await company.save();
    return company._id;
};

const getCompanyByName = async (companyName: String) => {
    return await Company
    .findOne({name: companyName})
    .select({password: 0, createdAt: 0, updatedAt: 0});
};

const getCompanyById = async (id: String) => {
    return await Company
    .findById(id)
    .select({ password: 0, createdAt: 0, updatedAt: 0 })
}

const getCompanies = async () => {
    return await Company
    .find()
    .select({ password: 0, createdAt: 0, updatedAt: 0 })
}

const updateCompany = async (email: String, data: any) => {
    const company = await Company.findOneAndUpdate({ email: email }, data)
    return company?._id
}

const removeCompany = async (email: String) => {
    return await Company.deleteOne({ email: email})
}

const login = async (com: ICompanyLogin) => {
    const company = await Company
    .findOne({ email: com.email })
    
    if (!company) {
        Logging.error("Company not found by this email")
        throw new Error("Company not found by this email.")
    }

    const isMatch = await bcrypt.compare(com.password, company.password);

    if (isMatch) {
        return generateToken({
            _id: company._id,
            name: company.name,
            website: company.website,
            address: company.address,
            email: company.email,
            phoneNumber: company.phoneNumber
        })
    } else {
        Logging.error("Password not correct")
        throw new Error("Password not correct")
    }

}

export { createCompany, getCompanyByName, updateCompany, getCompanyById, removeCompany, getCompanies, login }
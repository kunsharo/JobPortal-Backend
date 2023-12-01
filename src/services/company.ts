import mongoose from "mongoose"
import Company from "../models/Company"
import { ICompany } from "../models/interfaces/company"
import bcrypt from 'bcrypt'

const createCompany = async (com: ICompany) => {
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

const getCompany = async (companyName: String) => {
    return await Company
    .findOne({name: companyName})
    .select({password: 0, createdAt: 0, updatedAt: 0});
};

export { createCompany, getCompany }
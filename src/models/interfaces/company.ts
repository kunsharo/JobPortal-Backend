import { Document } from 'mongoose';

export interface ICompany {
    name: string,
    website: string,
    address: string,
    email: string,
    password: string,
    phoneNumber: string
}

export interface ICompanyModel extends ICompany, Document {}
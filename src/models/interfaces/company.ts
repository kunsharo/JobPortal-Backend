import { Document } from 'mongoose';

export interface ICompanyInput {
    name: string,
    website: string,
    address: string,
    email: string,
    password: string,
    phoneNumber: string
}

export interface ICompanyOutput {
    _id: string,
    name: string,
    website: string,
    address: string,
    email: string,
    phoneNumber: string
}

export interface ICompanyLogin {
    email: string,
    password: string
}

export interface ICompanyModel extends ICompanyInput, Document {}
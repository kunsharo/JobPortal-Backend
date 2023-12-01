import mongoose, { Schema } from "mongoose";
import { ICompanyModel } from "./interfaces/company";

const CompanySchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        website: { type: String },
        address: { type: String, required: true },
        email: { type: String, required: true},
        phoneNumber: { type: String, required: true},
        password: { type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ICompanyModel>('Company', CompanySchema);
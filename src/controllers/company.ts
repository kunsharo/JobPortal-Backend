import { Request, Response } from "express";
import { createCompany, getCompanyById, getCompanyByName, updateCompany } from "../services/company";
import Logging from "../library/logging";

const RegisterCompany = async (req: Request, res: Response) => {
    try {
        const id = await createCompany(req.body)
        Logging.info(id)
        return res.status(201).json({ created_user: id })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server error" })
    }
}

const ReadCompany = async (req: Request, res: Response) => {
    try {
        const name = req.params.name
        const company = await getCompanyByName(name)
        if (company == null) {
            return res.status(404).json({ error: "Resource not found" })
        }
        return res.status(201).json({ company: company})
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}

const ReadComapanyById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const company = await getCompanyById(id)
        if (company == null) {
            return res.status(404).json({ error: "Resource not found" })
        }
        return res.status(201).json({ company: company})
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}

const UpdateCompany =async (req: Request, res: Response) => {
    try {
        const comapanyEmail = req.params.email;
        const companyId = await updateCompany(comapanyEmail, req.body);
        if (companyId == null) {
            return res.status(404).json({ error: "Not found" })
        }
        return res.status(201).json({ updated_company: companyId})
    } catch (error) {
        return res.status(500).json({ error: "Internal Server error"})
    }
}
export { RegisterCompany, ReadCompany, UpdateCompany, ReadComapanyById }
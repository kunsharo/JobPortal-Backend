import { Request, Response } from "express";
import { createCompany, getCompanies, getCompanyById, getCompanyByName, login, removeCompany, updateCompany } from "../services/company";
import Logging from "../library/logging";

const RegisterCompany = async (req: Request, res: Response) => {
    try {
        const id = await createCompany(req.body)
        Logging.info(id)
        return res.status(201).json({ created_user: id })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
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
    } catch (error: any) {
        return res.status(500).json({ error: error.message})
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
    } catch (error: any) {
        return res.status(500).json({ error: error.message})
    }
}

const UpdateCompany = async (req: Request, res: Response) => {
    try {
        const comapanyEmail = req.params.email;
        const companyId = await updateCompany(comapanyEmail, req.body);
        if (companyId == null) {
            return res.status(404).json({ error: "Not found" })
        }
        return res.status(201).json({ updated_company: companyId})
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

const DeleteCompany = async (req: Request, res: Response) => {
    try {
        const companyEmail = req.params.email;
        const result = await removeCompany(companyEmail)
        if (result == null) {
            return res.status(404).json({ error: "Not found" })
        }
        return res.status(201).json({ company: result })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

const ReadAllCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await getCompanies()
        return res.status(201).json({ companies: companies })
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

const Login = async (req: Request, res: Response) => {
    try {
        const token = await login(req.body);
        Logging.info(`Token produced : ${token}`);
        res.status(201).json({ token: token })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export { RegisterCompany, ReadCompany, UpdateCompany, ReadComapanyById, DeleteCompany, ReadAllCompanies, Login }
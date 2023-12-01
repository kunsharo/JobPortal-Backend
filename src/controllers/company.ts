import { Request, Response } from "express";
import { createCompany, getCompany } from "../services/company";
import Logging from "../library/logging";

const RegisterCompany = async (req: Request, res: Response) => {
    try {
        const id = await createCompany(req.body)
        Logging.info(id)
        return res.status(201).json({ created_user: id })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const ReadCompany = async (req: Request, res: Response) => {
    try {
        const name = req.params.name
        const company = await getCompany(name)
        return res.status(201).json({ company: company})
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}
export { RegisterCompany, ReadCompany }
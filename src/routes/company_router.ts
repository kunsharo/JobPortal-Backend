import { Router } from "express";
import { ReadCompany, RegisterCompany } from "../controllers/company";

const companyRouter = Router();
companyRouter.post('/', RegisterCompany)
companyRouter.get('/:name', ReadCompany)

export default companyRouter
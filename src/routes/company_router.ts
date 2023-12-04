import { Router } from "express";
import { DeleteCompany, ReadAllCompanies, ReadComapanyById, ReadCompany, RegisterCompany, UpdateCompany } from "../controllers/company";

const companyRouter = Router();
companyRouter.post('/', RegisterCompany)
// companyRouter.get('/:name', ReadCompany)
companyRouter.get('/:id', ReadComapanyById)
companyRouter.patch('/:email', UpdateCompany)
companyRouter.delete('/:email', DeleteCompany)
companyRouter.get('/', ReadAllCompanies)

export default companyRouter
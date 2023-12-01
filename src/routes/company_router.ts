import { Router } from "express";
import { ReadComapanyById, ReadCompany, RegisterCompany, UpdateCompany } from "../controllers/company";

const companyRouter = Router();
companyRouter.post('/', RegisterCompany)
// companyRouter.get('/:name', ReadCompany)
companyRouter.get('/:id', ReadComapanyById)
companyRouter.patch('/:email', UpdateCompany)

export default companyRouter
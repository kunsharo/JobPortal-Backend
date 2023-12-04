import { Router } from "express";
import { DeleteCompany, Login, ReadAllCompanies, ReadComapanyById, ReadCompany, RegisterCompany, UpdateCompany } from "../controllers/company";
import { auth } from "../middlewares/auth";

const companyRouter = Router();
companyRouter.post('/', RegisterCompany)
companyRouter.post('/login', Login)
// companyRouter.get('/:name', ReadCompany)
companyRouter.get('/:id', auth, ReadComapanyById)
companyRouter.patch('/:email', UpdateCompany)
companyRouter.delete('/:email', DeleteCompany)
companyRouter.get('/', ReadAllCompanies)

export default companyRouter
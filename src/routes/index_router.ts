import { Router } from "express";
import companyRouter from "./company_router";

const router = Router()

router.use('/company', companyRouter)

export default router
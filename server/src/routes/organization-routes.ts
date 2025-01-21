import { Router } from "express";

import * as organizationController from "../controllers/organization-cotroller";

const router = Router();

router.get("/", organizationController.getOrganizations);
router.post("/", organizationController.createOrganization);

export default router;

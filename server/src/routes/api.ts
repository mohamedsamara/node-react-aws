import { Router } from "express";

import organizationRoutes from "./organization-routes";
import staffRoutes from "./staff-routes";

const apiRouter = Router();

apiRouter.use("/organization", organizationRoutes);
apiRouter.use("/staff", staffRoutes);

export default apiRouter;

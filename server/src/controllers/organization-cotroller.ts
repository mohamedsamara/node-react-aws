import { Request, Response } from "express";

import { OrganizationService } from "../services/organization-service";
import { handleError } from "../utils/error-handler";

const organizationService = new OrganizationService();

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await organizationService.getAllOrganizations();
    res.status(200).json(organizations);
  } catch (error) {
    handleError(error, res);
  }
};

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newOrganization = await organizationService.createOrganization({
      name,
    });
    res.status(201).json(newOrganization);
  } catch (error) {
    handleError(error, res);
  }
};

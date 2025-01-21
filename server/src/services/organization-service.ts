import { AppDataSource } from "../database/data-source";
import { Organization } from "../entities/organization";

export class OrganizationService {
  private organizationRepository = AppDataSource.getRepository(Organization);

  async getAllOrganizations() {
    return await this.organizationRepository.find({
      relations: ["staffMembers"],
    });
  }

  async createOrganization(data: { name: string }) {
    const newOrganization = this.organizationRepository.create({
      name: data.name,
    });
    return await this.organizationRepository.save(newOrganization);
  }
}

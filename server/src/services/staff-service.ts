import { AppDataSource } from "../database/data-source";
import { Staff } from "../entities/staff";
import { Organization } from "../entities/organization";

export class StaffService {
  private staffRepository = AppDataSource.getRepository(Staff);
  private organizationRepository = AppDataSource.getRepository(Organization);

  async getAllStaff() {
    return await this.staffRepository.find({});
  }

  async getStaffById(id: number) {
    return await this.staffRepository.findOne({
      where: { id },
    });
  }

  async createStaff(data: {
    firstName: string;
    lastName: string;
    specialty: string;
    contactNumber: string;
    organizationId: number;
  }) {
    const organization = await this.organizationRepository.findOne({
      where: { id: data.organizationId },
    });

    if (!organization) {
      throw new Error("Organization not found.");
    }

    const newStaff = this.staffRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      specialty: data.specialty,
      organization,
    });

    return await this.staffRepository.save(newStaff);
  }
}

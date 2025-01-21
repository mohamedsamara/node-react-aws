import { Staff, Organization } from "lib/types";

export const formatOrganizationName = (org: Organization) => `${org.name}`;

export const formatStaffName = (staff: Staff) =>
  `${staff.firstName} ${staff.lastName}`;

import { StateCreator } from "zustand";

import { Organization, Staff } from "lib/types";

export interface OrganizationSlice {
  organizations: Organization[];
  selectedOrganization: Organization | null;
  selectedStaff: Staff | null;
  staffMembers: Staff[];

  setOrganizations: (organizations: Organization[]) => void;
  setSelectedOrganization: (organization: Organization) => void;
  setSelectedStaff: (staff: Staff) => void;
}

export const createOrganizationSlice: StateCreator<
  OrganizationSlice,
  [],
  [],
  OrganizationSlice
> = (set) => {
  return {
    organizations: [],
    staffMembers: [],
    selectedOrganization: null,
    selectedStaff: null,

    setOrganizations: (organizations: Organization[]) => {
      set({
        organizations: organizations,
      });
    },
    setSelectedOrganization: (organization: Organization) => {
      set({
        selectedOrganization: organization,
        staffMembers: organization.staffMembers,
      });
    },
    setSelectedStaff: (staff: Staff) => {
      set({
        selectedStaff: staff,
      });
    },
  };
};

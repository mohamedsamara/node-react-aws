export type Organization = {
  id: number;
  name: string;
  staffMembers: Staff[];
};

export type Staff = {
  id: number;
  firstName: string;
  lastName: string;
  specialty: string;
  contactNumber: string;
  timezone: string;
};

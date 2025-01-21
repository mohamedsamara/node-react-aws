import { API_URL } from "lib/constants";
import { Organization } from "lib/types";

export const fetchOrganizations = async (): Promise<Organization[]> => {
  const response = await fetch(`${API_URL}/organization`);
  if (!response.ok) {
    throw new Error(
      `Failed to get organizations from server: ${response.statusText}`
    );
  }
  const result: Organization[] = await response.json();
  return result;
};

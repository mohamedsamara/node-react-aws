import { useQuery } from "@tanstack/react-query";

import { fetchOrganizations } from "lib/api";
import { Organization } from "lib/types";
import useStore from "lib/stores";

export const useOrganizationsQuery = () => {
  const { setOrganizations } = useStore();
  return useQuery<Organization[]>(["fetchOrganizations"], fetchOrganizations, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setOrganizations(data),
  });
};

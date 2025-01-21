import { create } from "zustand";

import { createOrganizationSlice, OrganizationSlice } from "./organization";

type Store = OrganizationSlice;

const useStore = create<Store>()((...a) => ({
  ...createOrganizationSlice(...a),
}));

export default useStore;

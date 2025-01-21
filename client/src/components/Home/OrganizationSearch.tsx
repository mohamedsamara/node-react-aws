import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";

import { Organization } from "lib/types";
import useStore from "lib/stores";
import { formatOrganizationName } from "lib/utils";
import {
  StyledTextField,
  StyledTextFieldProps,
  StyledAutocompleteMenuItem,
} from "components/Inputs";

type Props = {
  disableClearable?: boolean;
  textFieldProps?: StyledTextFieldProps;
  orgId?: number | null;
  onSelect: (value: Organization | null) => void;
};

const OrganizationSearch = ({
  disableClearable = false,
  textFieldProps,
  orgId,
  onSelect,
}: Props) => {
  const { organizations } = useStore();
  const [value, setValue] = useState<Organization | null>(null);

  useEffect(() => {
    const org = organizations.find((org) => org.id === orgId);
    setValue(org || null);
  }, [orgId, organizations]);

  return (
    <Autocomplete
      sx={{
        height: "100%",
      }}
      disableClearable={disableClearable}
      popupIcon={<KeyboardArrowDownIcon />}
      getOptionLabel={formatOrganizationName}
      options={organizations}
      value={value}
      onChange={(_, value) => {
        setValue(value);
        onSelect(value);
      }}
      renderOption={({ key, ...rest }, option) => (
        <StyledAutocompleteMenuItem
          key={key}
          text={formatOrganizationName(option)}
          {...rest}
        />
      )}
      renderInput={(params) => {
        return (
          <StyledTextField
            label="Organization"
            placeholder="Search organizations"
            {...params}
            {...textFieldProps}
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        );
      }}
      isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
    />
  );
};

export default OrganizationSearch;

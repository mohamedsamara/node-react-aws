import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";

import { Staff } from "lib/types";
import useStore from "lib/stores";
import { formatStaffName } from "lib/utils";
import {
  StyledTextField,
  StyledTextFieldProps,
  StyledAutocompleteMenuItem,
} from "components/Inputs";

type Props = {
  disableClearable?: boolean;
  textFieldProps?: StyledTextFieldProps;
  staffId?: number | null;
  onSelect: (value: Staff | null) => void;
};

const StaffSearch = ({
  disableClearable = false,
  textFieldProps,
  staffId,
  onSelect,
}: Props) => {
  const { staffMembers } = useStore();
  const [value, setValue] = useState<Staff | null>(null);

  useEffect(() => {
    const staff = staffMembers.find((staff) => staff.id === staffId);
    setValue(staff || null);
  }, [staffId, staffMembers]);

  return (
    <Autocomplete
      sx={{
        height: "100%",
      }}
      disableClearable={disableClearable}
      popupIcon={<KeyboardArrowDownIcon />}
      getOptionLabel={formatStaffName}
      options={staffMembers}
      value={value}
      onChange={(_, value) => {
        setValue(value);
        onSelect(value);
      }}
      renderOption={({ key, ...rest }, option) => (
        <StyledAutocompleteMenuItem
          key={key}
          text={formatStaffName(option)}
          {...rest}
        />
      )}
      renderInput={(params) => {
        return (
          <StyledTextField
            label="Staff"
            placeholder="Search staff"
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

export default StaffSearch;

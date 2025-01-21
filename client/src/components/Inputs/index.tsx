import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export type StyledTextFieldProps = TextFieldProps & {
  borderColor?: "primary" | "secondary";
};

export const StyledTextField = ({
  borderColor = "primary",
  sx,
  ...rest
}: StyledTextFieldProps) => {
  return (
    <TextField
      autoComplete="off"
      sx={{
        "& .MuiOutlinedInput-root": {
          ...(borderColor === "secondary" && {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.border.secondary,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.border.secondaryHover,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.border.focus,
            },
          }),
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

export const StyledMenuItem = (props: MenuItemProps) => {
  return (
    <MenuItem
      {...props}
      sx={{
        minHeight: 42,
        ...props.sx,
      }}
    />
  );
};

export const StyledAutocompleteMenuItem = ({
  text,
  ...rest
}: MenuItemProps & { text: string }) => {
  return (
    <StyledMenuItem
      sx={{
        "&.MuiAutocomplete-option": {
          minHeight: 42,
        },
      }}
      {...rest}
    >
      <Typography variant="body1" noWrap>
        {text}
      </Typography>
    </StyledMenuItem>
  );
};

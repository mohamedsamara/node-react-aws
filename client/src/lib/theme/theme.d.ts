import { Color } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Variant } from "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface Theme {
    rounded: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      full: number;
    };
  }

  interface ThemeOptions {
    rounded?: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      full: number;
    };
  }

  interface TypeText {
    tertiary: string;
  }

  interface TypeBackground {
    primary: string;
    secondary: string;
    backdrop: string;
  }

  interface TypeAction {
    ripple: string;
    highlight: string;
  }

  interface Palette {
    boxShadow: {
      primary: string;
    };

    dropShadow: {
      primary: string;
    };

    border: {
      primary: string;
      primaryHover: string;
      secondary: string;
      secondaryHover: string;
      focus: string;
    };
    hover: {
      primary: string;
      secondary: string;
      tertiary: string;
    };

    blueGrey: Color;
    yellow: Color;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    body3?: React.CSSProperties;
  }
}

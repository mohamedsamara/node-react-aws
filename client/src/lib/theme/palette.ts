import colors from "./colors";

const { common, blue, green, red, yellow, grey, blueGrey } = colors;

export const primary = blue[600];

export const secondary = blueGrey[600];

export const disabled = blueGrey[500];

export const hover = {
  primary: blue[50],
  secondary: grey[500],
  tertiary: grey[50],
};

export const boxShadow = {
  primary:
    "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.03) 0px 0px 0px 1px, rgba(0, 0, 0, 0.07) 0px 10px 15px -3px, rgba(0, 0, 0, 0.03) 0px 4px 6px -2px",
};

export const dropShadow = {
  primary: "drop-shadow(0px 3px 8px rgba(0,0,0,0.19))",
};

export const border = {
  primary: grey[200],
  primaryHover: grey[300],
  secondary: grey[300],
  secondaryHover: grey[400],
  focus: blue[600],
};

export default {
  primary: {
    main: primary,
  },
  secondary: {
    main: secondary,
  },
  error: {
    main: red[400],
  },
  info: {
    main: blue.A200,
  },
  warning: {
    main: yellow.A100,
  },
  success: {
    main: green.A700,
  },

  background: {
    default: grey[100],
    paper: common.white,
    primary: grey[50],
    secondary: blueGrey[50],
    backdrop: "#00000080",
  },
  text: {
    primary: blueGrey[800],
    secondary: blueGrey[600],
    tertiary: blueGrey[400],
    disabled: disabled,
  },
  action: {
    active: blueGrey[400], // Used for icons
    hover: grey[50],
    selected: blue[50],
    focus: grey[100],
    disabled: disabled,
    ripple: blueGrey[100],
    highlight: grey[600],
  },
  border,
  boxShadow,
  dropShadow,
  hover,
  blueGrey,
  yellow,
};

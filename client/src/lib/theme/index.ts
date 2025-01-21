import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import palette from "./palette";
import typography, { weight } from "./typography";
import { borderRounded } from "./styles";
import colors from "./colors";

const theme = createTheme({
  cssVariables: true,
  palette: palette,
  typography,
  rounded: borderRounded,
  components: {
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          "& .MuiTouchRipple-root": {
            color: palette.action.ripple,
          },
          "& .MuiCardActionArea-focusHighlight": {
            backgroundColor: palette.action.highlight,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.active": {
            backgroundColor:
              "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",

            "&:hover": {
              backgroundColor:
                "rgba(var(--mui-palette-primary-mainChannel) / calc(var(--mui-palette-action-selectedOpacity) + var(--mui-palette-action-hoverOpacity)))",
            },

            "&.Mui-focusVisible": {
              backgroundColor:
                "rgba(var(--mui-palette-primary-mainChannel) / calc(var(--mui-palette-action-selectedOpacity) + var(--mui-palette-action-hoverOpacity)))",
            },

            ".MuiListItemIcon-root": {
              color: palette.primary.main,
            },
            ".MuiListItemText-root": {
              color: palette.primary.main,
            },
          },
          "& .MuiTouchRipple-root": {
            color: palette.action.ripple,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: palette.border.primary,
          boxShadow: "none",
        },
      },
      variants: [
        {
          props: { color: "default" },
          style: {
            backgroundColor: palette.background.paper,
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: palette.boxShadow.primary,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderColor: palette.border.primary,
          boxShadow: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: palette.boxShadow.primary,
          "&.MuiPaper-root::before": {
            backgroundColor: palette.border.primary,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.border.primary,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: palette.border.primary,
          color: palette.text.primary,
          fontWeight: weight.medium,
          textTransform: "capitalize",
          "&.Mui-selected": {
            "&.MuiToggleButton-warning": {
              backgroundColor:
                "rgba(var(--mui-palette-warning-mainChannel) / 0.22)",
              color: colors.deepYellow[600],

              "&:hover": {
                backgroundColor:
                  "rgba(var(--mui-palette-warning-mainChannel) / calc(0.3 + var(--mui-palette-action-hoverOpacity)))",
              },
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          "&.MuiAlert-filledSuccess": {
            color: "white",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.border.primary,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.border.primaryHover,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.border.focus,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.error.main,
          },
          "&.Mui-success .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.success.main,
          },
          "&.Mui-warning .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.warning.main,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "& .MuiTouchRipple-root": {
            color: palette.action.ripple,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: weight.medium,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
          backgroundColor: palette.background.secondary,
          border: `1px solid ${palette.border.secondary}`,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingTop: 28,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingBottom: 18,
          paddingRight: 20,
          paddingLeft: 20,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          WebkitTapHighlightColor: "transparent",
          outline: "none",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "transparent",
          borderRadius: borderRounded.md,
          transition:
            "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

          "&:hover": {
            backgroundColor:
              "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          },

          "&.Mui-focusVisible": {
            borderColor: palette.border.focus,
            backgroundColor:
              "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);

import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.6rem",
    },
    h4: {
      fontSize: "1.4rem",
    },
    h5: {
      fontSize: "1.3rem",
    },
    h6: {
      fontSize: "1rem",
    },
    inherit: {
      fontSize: "inherit",
    },
    fontSize: "1.7rem",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#f7f7f7",
    },
    secondary: {
      main: "#d9d9d99e",
    },
    tertiary: {
      main: "#3c8bd9"
    },
    background: "rgba(71, 161, 92, 0.389)",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "24px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        startIcon: {
          ">*:nth-of-type(1)": {
            fontSize: "24px",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#f7f7f7",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          backgroundColor: "#f7f7f7",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#f7f7f7",
        },
      },
    },
  },
});

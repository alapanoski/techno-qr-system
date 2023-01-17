import "../styles/globals.css";
import UserState from "../context/userContext";
import { createTheme, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#036491",
      },
      secondary: {
        main: "#041C2B",
      },
    },
    typography: {
      allVariants: {
        fontFamily: "Montserrat",
        textTransform: "none",
        color: "#036491",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <UserState>
        <Component {...pageProps} />
      </UserState>
    </ThemeProvider>
  );
}

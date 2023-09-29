import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Link from "@mui/material/Link";

const defaultTheme = createTheme();

export default function Authorization() {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const toggleForm = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  const handleSuccessfulRegistration = () => {
    setRegistrationSuccessful(true);
    // Optionally, you can set a timer to switch back to the login form after a delay
    setTimeout(() => {
      setRegisterVisible(false);
      setRegistrationSuccessful(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isRegisterVisible ? (
              <Register
                onSuccessfulRegistration={handleSuccessfulRegistration}
              />
            ) : (
              <Login />
            )}
          </Box>

          <Grid container>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isRegisterVisible ? (
                  <Link onClick={toggleForm} variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                ) : (
                  <Link onClick={toggleForm} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

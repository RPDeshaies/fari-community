import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Fade from "@mui/material/Fade";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { Suspense, useContext } from "react";
import ReactDom from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { SettingsContext, useSettings } from "./contexts/SettingsContext";
import { Navbar } from "./Navbar";
import { darkTheme, lightTheme } from "./theme";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const NotFoundPage = React.lazy(
  () => import("./pages/NotFoundPage/NotFoundPage")
);

function AppProviders(props: { children: any }) {
  const settingsManager = useSettings();
  return (
    <SettingsContext.Provider value={settingsManager}>
      {props.children}
    </SettingsContext.Provider>
  );
}

function App() {
  const settingsManager = useContext(SettingsContext);
  return (
    <>
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider
            theme={
              settingsManager.state.themeMode === "dark"
                ? darkTheme
                : lightTheme
            }
          >
            <CssBaseline />
            <Router>
              <ScrollToTop />
              <Navbar />
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <Fade in>
                      <Container maxWidth="md">
                        <Box
                          display="flex"
                          justifyContent="center"
                          margin="3rem 0"
                        >
                          <CircularProgress />
                        </Box>
                      </Container>
                    </Fade>
                  }
                >
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route
                      exact
                      path={"/discord"}
                      render={() => {
                        window.location.href = "https://discord.gg/vMAJFjUraA";
                        return null;
                      }}
                    />

                    <Route
                      path="*"
                      render={() => {
                        return <NotFoundPage />;
                      }}
                    />
                  </Switch>
                </Suspense>

                <Box mb="50vh" />
              </ErrorBoundary>
            </Router>
          </ThemeProvider>
        </StyledEngineProvider>
      </HelmetProvider>
    </>
  );
}

ReactDom.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
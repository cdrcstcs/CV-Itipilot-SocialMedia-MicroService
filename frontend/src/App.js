import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useAuthContext } from "scenes/context/UserContext";
function App() {
  const {userDataFetch} = useAuthContext();
  const mode = "dark";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  if (!userDataFetch){
    return null;
  }
  console.log(userDataFetch);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/profile/:userId"
              element={<ProfilePage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;

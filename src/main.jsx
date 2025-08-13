import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./components/Theme-provider";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignPage";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:author",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/sign",
        element: <SignIn />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
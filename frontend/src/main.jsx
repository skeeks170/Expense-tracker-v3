import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/HomePage";
import { UserIdProvider } from "./UserIdContext";

// eslint-disable-next-line no-unused-vars
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/primereact.min.css";

// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <UserIdProvider>
        <RouterProvider router={router} />
      </UserIdProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);

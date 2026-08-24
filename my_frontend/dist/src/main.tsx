import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root from "./layouts/main-layout";
import ErrorView from "./views/ErrorView";
import App from "./App";
import CreateNoteView from "./views/CreateNoteView";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      { index: true, element: <App /> },
      { path: "note/create", element: <CreateNoteView /> },
      { path: "register", element: <RegisterView /> },
      { path: "login", element: <LoginView /> }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

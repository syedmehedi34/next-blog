import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./providers/AuthProvider";
import BlogDetailsProvider from "./providers/BlogDetailsProvider";
import { ThemeProvider } from "./ThemeControl/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlogDetailsProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
          <ToastContainer />
        </AuthProvider>
      </ThemeProvider>
    </BlogDetailsProvider>
  </StrictMode>
);

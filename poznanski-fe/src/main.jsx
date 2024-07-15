//Project for Computer Science Thesis - Andre Dos Santos
//Developing an E-commerce Platform for Network Devices

import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

// TanStack Query
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </AuthProvider>
);

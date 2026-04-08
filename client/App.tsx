import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import SolarAssessment from "./pages/SolarAssessment";
import Subsidies from "./pages/Subsidies";
import ServiceProviders from "./pages/ServiceProviders";
import ServiceNotifications from "./pages/ServiceNotifications";
import Resources from "./pages/Resources";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "./utils/authUtils";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/assessment"
              element={<ProtectedRoute element={<Assessment />} />}
            />
            <Route
              path="/solar-assessment"
              element={<ProtectedRoute element={<SolarAssessment />} />}
            />
            <Route
              path="/subsidies"
              element={<ProtectedRoute element={<Subsidies />} />}
            />
            <Route
              path="/service-providers"
              element={<ProtectedRoute element={<ServiceProviders />} />}
            />
            <Route
              path="/notifications"
              element={<ProtectedRoute element={<ServiceNotifications />} />}
            />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

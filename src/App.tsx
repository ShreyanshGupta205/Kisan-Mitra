import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CropLibrary from "./pages/CropLibrary";
import CropDetail from "./pages/CropDetail";
import MandiRates from "./pages/MandiRates";
import Transport from "./pages/Transport";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import QuestionDetail from "./pages/QuestionDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crops" element={<CropLibrary />} />
          <Route path="/crops/:id" element={<CropDetail />} />
          <Route path="/mandi-rates" element={<MandiRates />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<QuestionDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

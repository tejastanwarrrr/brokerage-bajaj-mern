import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TradingProvider } from "@/context/TradingContext";
import Index from "./pages/Index";
import Instruments from "./pages/Instruments";
import Orders from "./pages/Orders";
import Trades from "./pages/Trades";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TradingProvider>
        <Toaster />
        <Sonner position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TradingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

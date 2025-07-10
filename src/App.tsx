
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<div className="p-8"><h1 className="text-2xl font-bold">Transactions Page</h1><p>Coming soon...</p></div>} />
          <Route path="/reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Reports Page</h1><p>Coming soon...</p></div>} />
          <Route path="/categories" element={<div className="p-8"><h1 className="text-2xl font-bold">Categories Page</h1><p>Coming soon...</p></div>} />
          <Route path="/budget" element={<div className="p-8"><h1 className="text-2xl font-bold">Budget Planner Page</h1><p>Coming soon...</p></div>} />
          <Route path="/goals" element={<div className="p-8"><h1 className="text-2xl font-bold">Goals Page</h1><p>Coming soon...</p></div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

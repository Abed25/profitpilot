
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SummaryCards from '@/components/Dashboard/SummaryCards';
import Charts from '@/components/Dashboard/Charts';
import Widgets from '@/components/Dashboard/Widgets';
import AddTransactionModal from '@/components/AddTransactionModal';
import AdvancedFilters from '@/components/AdvancedFilters';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd persist this to localStorage and apply to document
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          toggleCollapse={toggleSidebar}
          closeMobile={closeMobileSidebar}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            toggleSidebar={toggleSidebar}
          />
          
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header with Add Transaction */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Welcome back! Here's your financial overview.
                  </p>
                </div>
                <AddTransactionModal />
              </div>

              {/* Advanced Filters */}
              <AdvancedFilters />

              {/* Summary Cards */}
              <SummaryCards />

              {/* Charts */}
              <Charts />

              {/* Widgets */}
              <Widgets />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;

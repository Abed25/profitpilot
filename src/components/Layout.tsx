import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage on initial load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference if no saved theme
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    return savedSidebarState === 'true';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only apply system theme if user hasn't set a custom preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
    <div className={`min-h-screen w-full overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex w-full max-w-full">
        {/* Fixed Sidebar on Desktop */}
        <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-50">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            isMobileOpen={isMobileSidebarOpen}
            toggleCollapse={toggleSidebar}
            closeMobile={closeMobileSidebar}
          />
        </div>
        
        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            isMobileOpen={isMobileSidebarOpen}
            toggleCollapse={toggleSidebar}
            closeMobile={closeMobileSidebar}
          />
        </div>
        
        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}>
          {/* Fixed Header on Desktop */}
          <div className={`lg:fixed lg:top-0 lg:right-0 lg:z-40 lg:transition-all lg:duration-300 ${
            isSidebarCollapsed ? 'lg:left-20' : 'lg:left-64'
          }`}>
            <Navbar
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              toggleSidebar={toggleSidebar}
            />
          </div>
          
          {/* Scrollable Main Content */}
          <main className="flex-1 lg:pt-16 overflow-y-auto overflow-x-hidden w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout; 
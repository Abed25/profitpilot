
import Layout from '@/components/Layout';
import SummaryCards from '@/components/Dashboard/SummaryCards';
import Charts from '@/components/Dashboard/Charts';
import Widgets from '@/components/Dashboard/Widgets';
import AddTransactionModal from '@/components/AddTransactionModal';
import AdvancedFilters from '@/components/AdvancedFilters';
import BusinessTips from '@/components/BusinessTips';

const Index = () => {
  return (
    <Layout>
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Add Transaction */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Profit Report
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">
                Welcome back! Here is a summary of your business.
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

          {/* Business Tips */}
          <BusinessTips />

          {/* Widgets */}
          <Widgets />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

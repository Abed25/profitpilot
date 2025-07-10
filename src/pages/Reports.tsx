import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Calendar, Download, Filter, PieChart, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const formatKES = (value: number) => {
    return `KES ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const monthlyData = [
    { month: 'Jan', income: 125000, expenses: 83000, profit: 42000 },
    { month: 'Feb', income: 118000, expenses: 79000, profit: 39000 },
    { month: 'Mar', income: 132000, expenses: 85000, profit: 47000 },
    { month: 'Apr', income: 145000, expenses: 92000, profit: 53000 },
    { month: 'May', income: 138000, expenses: 88000, profit: 50000 },
    { month: 'Jun', income: 156000, expenses: 95000, profit: 61000 }
  ];

  const categoryData = [
    { category: 'Sales', amount: 450000, percentage: 45, color: 'bg-green-500' },
    { category: 'Services', amount: 180000, percentage: 18, color: 'bg-blue-500' },
    { category: 'Investment', amount: 120000, percentage: 12, color: 'bg-purple-500' },
    { category: 'Stock Returns', amount: 80000, percentage: 8, color: 'bg-yellow-500' },
    { category: 'Other Income', amount: 170000, percentage: 17, color: 'bg-orange-500' }
  ];

  const expenseData = [
    { category: 'Stock', amount: 320000, percentage: 40, color: 'bg-red-500' },
    { category: 'Rent', amount: 120000, percentage: 15, color: 'bg-pink-500' },
    { category: 'Transport', amount: 96000, percentage: 12, color: 'bg-indigo-500' },
    { category: 'Utilities', amount: 80000, percentage: 10, color: 'bg-teal-500' },
    { category: 'M-PESA Charges', amount: 64000, percentage: 8, color: 'bg-cyan-500' },
    { category: 'Salaries', amount: 48000, percentage: 6, color: 'bg-emerald-500' },
    { category: 'Miscellaneous', amount: 72000, percentage: 9, color: 'bg-amber-500' }
  ];

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = monthlyData.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin = ((totalProfit / totalIncome) * 100).toFixed(1);

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const incomeGrowth = ((currentMonth.income - previousMonth.income) / previousMonth.income * 100).toFixed(1);
  const expenseGrowth = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1);
  const profitGrowth = ((currentMonth.profit - previousMonth.profit) / previousMonth.profit * 100).toFixed(1);

  return (
    <Layout>
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Financial Reports
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">
                Comprehensive financial analysis and insights
              </p>
            </div>
            <div className="flex space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatKES(totalIncome)}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +{incomeGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatKES(totalExpenses)}
                </div>
                <p className="text-xs text-red-600 mt-1">
                  +{expenseGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Net Profit
                </CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatKES(totalProfit)}
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  +{profitGrowth}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Profit Margin
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {profitMargin}%
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Healthy margin
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Report Type Selector */}
          <Card className="shadow-lg border-0 mb-6 lg:mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Report Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant={selectedReport === 'overview' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setSelectedReport('overview')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={selectedReport === 'income' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setSelectedReport('income')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Income Analysis
                </Button>
                <Button
                  variant={selectedReport === 'expenses' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setSelectedReport('expenses')}
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Expense Analysis
                </Button>
                <Button
                  variant={selectedReport === 'trends' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setSelectedReport('trends')}
                >
                  <LineChart className="w-4 h-4 mr-2" />
                  Trends
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Monthly Performance Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="w-5 h-5" />
                  <span>Monthly Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.month}</span>
                        <span className="text-sm text-gray-500">
                          {formatKES(item.profit)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Income: {formatKES(item.income)}</span>
                          <span>Expenses: {formatKES(item.expenses)}</span>
                        </div>
                        <Progress 
                          value={(item.profit / item.income) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Income Breakdown */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Income Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-gray-500">
                          {formatKES(item.amount)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                        <span className="text-xs text-gray-500 w-12 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5" />
                  <span>Expense Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-gray-500">
                          {formatKES(item.amount)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                        <span className="text-xs text-gray-500 w-12 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Key Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      📈 Strong Growth
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Income increased by {incomeGrowth}% this month, showing strong business performance.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      💰 Healthy Profit Margin
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {profitMargin}% profit margin indicates good cost management and pricing strategy.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      ⚠️ Expense Alert
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Expenses increased by {expenseGrowth}%. Consider reviewing cost optimization strategies.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                      🎯 Top Performer
                    </h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Sales category contributes {categoryData[0].percentage}% of total income.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports; 
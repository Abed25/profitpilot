import { useState } from 'react';
import { Plus, Target, TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/Layout';

const Budget = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const budgets = [
    {
      id: 1,
      category: 'Stock',
      type: 'expense',
      budget: 350000,
      spent: 320000,
      remaining: 30000,
      period: 'month',
      status: 'on-track',
      icon: '📦',
      color: 'bg-red-500',
      lastUpdated: '2024-01-10'
    },
    {
      id: 2,
      category: 'Transport',
      type: 'expense',
      budget: 100000,
      spent: 96000,
      remaining: 4000,
      period: 'month',
      status: 'on-track',
      icon: '🚚',
      color: 'bg-orange-500',
      lastUpdated: '2024-01-09'
    },
    {
      id: 3,
      category: 'Utilities',
      type: 'expense',
      budget: 85000,
      spent: 80000,
      remaining: 5000,
      period: 'month',
      status: 'on-track',
      icon: '⚡',
      color: 'bg-teal-500',
      lastUpdated: '2024-01-08'
    },
    {
      id: 4,
      category: 'M-PESA Charges',
      type: 'expense',
      budget: 70000,
      spent: 64000,
      remaining: 6000,
      period: 'month',
      status: 'under-budget',
      icon: '📱',
      color: 'bg-pink-500',
      lastUpdated: '2024-01-07'
    },
    {
      id: 5,
      category: 'Rent',
      type: 'expense',
      budget: 120000,
      spent: 120000,
      remaining: 0,
      period: 'month',
      status: 'exceeded',
      icon: '🏢',
      color: 'bg-purple-500',
      lastUpdated: '2024-01-06'
    },
    {
      id: 6,
      category: 'Sales',
      type: 'income',
      budget: 500000,
      earned: 450000,
      remaining: 50000,
      period: 'month',
      status: 'on-track',
      icon: '🛍️',
      color: 'bg-green-500',
      lastUpdated: '2024-01-05'
    },
    {
      id: 7,
      category: 'Services',
      type: 'income',
      budget: 200000,
      earned: 180000,
      remaining: 20000,
      period: 'month',
      status: 'on-track',
      icon: '💼',
      color: 'bg-blue-500',
      lastUpdated: '2024-01-04'
    },
    {
      id: 8,
      category: 'Investment',
      type: 'income',
      budget: 100000,
      earned: 120000,
      remaining: -20000,
      period: 'month',
      status: 'exceeded',
      icon: '📈',
      color: 'bg-indigo-500',
      lastUpdated: '2024-01-03'
    }
  ];

  const formatKES = (value: number) => {
    return `KES ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'under-budget':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'on-track':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return 'bg-red-100 text-red-800';
      case 'under-budget':
        return 'bg-green-100 text-green-800';
      case 'on-track':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBudgets = budgets.filter(budget => budget.period === selectedPeriod);

  const totalBudget = filteredBudgets.reduce((sum, budget) => sum + budget.budget, 0);
  const totalSpent = filteredBudgets
    .filter(b => b.type === 'expense')
    .reduce((sum, budget) => sum + (budget as any).spent, 0);
  const totalEarned = filteredBudgets
    .filter(b => b.type === 'income')
    .reduce((sum, budget) => sum + (budget as any).earned, 0);

  const onTrackCount = filteredBudgets.filter(b => b.status === 'on-track').length;
  const exceededCount = filteredBudgets.filter(b => b.status === 'exceeded').length;
  const underBudgetCount = filteredBudgets.filter(b => b.status === 'under-budget').length;

  return (
    <Layout>
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Budget Planner
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">
                Plan and track your monthly budgets
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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Budget
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Budget</DialogTitle>
                    <DialogDescription>
                      Create a new budget for a category
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stock">Stock</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Budget Amount</label>
                      <Input 
                        type="number"
                        placeholder="Enter budget amount"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Period</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Weekly</SelectItem>
                          <SelectItem value="month">Monthly</SelectItem>
                          <SelectItem value="quarter">Quarterly</SelectItem>
                          <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Create Budget
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Budget
                </CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatKES(totalBudget)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {filteredBudgets.length} categories
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Spent
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatKES(totalSpent)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Earned
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatKES(totalEarned)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Income targets
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status Overview
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">On Track</span>
                    <span className="font-semibold">{onTrackCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Exceeded</span>
                    <span className="font-semibold">{exceededCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Under Budget</span>
                    <span className="font-semibold">{underBudgetCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredBudgets.map((budget) => {
              const isIncome = budget.type === 'income';
              const currentAmount = isIncome ? (budget as any).earned : (budget as any).spent;
              const usagePercentage = (currentAmount / budget.budget) * 100;
              
              return (
                <Card key={budget.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${budget.color} flex items-center justify-center text-white text-lg`}>
                          {budget.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{budget.category}</CardTitle>
                          <Badge 
                            variant={isIncome ? 'default' : 'secondary'}
                            className={isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                          >
                            {budget.type}
                          </Badge>
                        </div>
                      </div>
                      {getStatusIcon(budget.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Budget</span>
                        <span className="text-sm font-semibold text-blue-600">
                          {formatKES(budget.budget)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {isIncome ? 'Earned' : 'Spent'}
                        </span>
                        <span className={`text-sm font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                          {formatKES(currentAmount)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Remaining</span>
                        <span className={`text-sm font-semibold ${budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatKES(Math.abs(budget.remaining))}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-500">
                            {usagePercentage.toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(usagePercentage, 100)} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status</span>
                        <Badge className={getStatusColor(budget.status)}>
                          {budget.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Last updated</span>
                        <span>{new Date(budget.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredBudgets.length === 0 && (
            <Card className="shadow-lg border-0">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No budgets found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  Get started by creating your first budget
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Budget
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Budget; 
import { useState } from 'react';
import { Plus, Edit, Trash2, Tag, DollarSign, TrendingUp, BarChart3, MoreHorizontal } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/Layout';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const categories = [
    {
      id: 1,
      name: 'Sales',
      type: 'income',
      description: 'Revenue from product sales',
      color: 'bg-green-500',
      totalAmount: 450000,
      transactionCount: 45,
      monthlyGrowth: 12.5,
      budget: 500000,
      icon: '🛍️'
    },
    {
      id: 2,
      name: 'Stock',
      type: 'expense',
      description: 'Inventory and stock purchases',
      color: 'bg-red-500',
      totalAmount: 320000,
      transactionCount: 38,
      monthlyGrowth: -8.2,
      budget: 350000,
      icon: '📦'
    },
    {
      id: 3,
      name: 'Services',
      type: 'income',
      description: 'Consulting and service fees',
      color: 'bg-blue-500',
      totalAmount: 180000,
      transactionCount: 22,
      monthlyGrowth: 15.3,
      budget: 200000,
      icon: '💼'
    },
    {
      id: 4,
      name: 'Rent',
      type: 'expense',
      description: 'Office and storage rent',
      color: 'bg-purple-500',
      totalAmount: 120000,
      transactionCount: 12,
      monthlyGrowth: 0,
      budget: 120000,
      icon: '🏢'
    },
    {
      id: 5,
      name: 'Transport',
      type: 'expense',
      description: 'Transportation and delivery costs',
      color: 'bg-orange-500',
      totalAmount: 96000,
      transactionCount: 28,
      monthlyGrowth: 5.7,
      budget: 100000,
      icon: '🚚'
    },
    {
      id: 6,
      name: 'Utilities',
      type: 'expense',
      description: 'Electricity, water, and internet',
      color: 'bg-teal-500',
      totalAmount: 80000,
      transactionCount: 15,
      monthlyGrowth: 2.1,
      budget: 85000,
      icon: '⚡'
    },
    {
      id: 7,
      name: 'M-PESA Charges',
      type: 'expense',
      description: 'Mobile money transaction fees',
      color: 'bg-pink-500',
      totalAmount: 64000,
      transactionCount: 156,
      monthlyGrowth: 8.9,
      budget: 70000,
      icon: '📱'
    },
    {
      id: 8,
      name: 'Investment',
      type: 'income',
      description: 'Investment returns and dividends',
      color: 'bg-indigo-500',
      totalAmount: 120000,
      transactionCount: 8,
      monthlyGrowth: 22.1,
      budget: 100000,
      icon: '📈'
    }
  ];

  const formatKES = (value: number) => {
    return `KES ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || category.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalIncome = categories
    .filter(c => c.type === 'income')
    .reduce((sum, c) => sum + c.totalAmount, 0);

  const totalExpenses = categories
    .filter(c => c.type === 'expense')
    .reduce((sum, c) => sum + c.totalAmount, 0);

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (categoryId: number) => {
    // In a real app, you'd make an API call here
    console.log('Delete category:', categoryId);
  };

  return (
    <Layout>
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Categories
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">
                Manage your income and expense categories
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory ? 'Update category details' : 'Create a new category for your transactions'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Category Name</label>
                    <Input 
                      placeholder="Enter category name"
                      defaultValue={editingCategory?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input 
                      placeholder="Enter description"
                      defaultValue={editingCategory?.description || ''}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select defaultValue={editingCategory?.type || 'expense'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Monthly Budget (Optional)</label>
                    <Input 
                      type="number"
                      placeholder="Enter budget amount"
                      defaultValue={editingCategory?.budget || ''}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    {editingCategory ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Categories
                </CardTitle>
                <Tag className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {categories.length}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {categories.filter(c => c.type === 'income').length} income, {categories.filter(c => c.type === 'expense').length} expense
                </p>
              </CardContent>
            </Card>

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
                <p className="text-xs text-gray-500 mt-1">
                  From {categories.filter(c => c.type === 'income').length} categories
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Expenses
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatKES(totalExpenses)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  From {categories.filter(c => c.type === 'expense').length} categories
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-lg border-0 mb-6 lg:mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Categories</label>
                  <Input
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center text-white text-lg`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <Badge 
                          variant={category.type === 'income' ? 'default' : 'secondary'}
                          className={category.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {category.type}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Amount</span>
                      <span className={`text-sm font-semibold ${category.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {formatKES(category.totalAmount)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Transactions</span>
                      <span className="text-sm text-gray-500">
                        {category.transactionCount}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Monthly Growth</span>
                      <span className={`text-sm font-semibold ${category.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {category.monthlyGrowth >= 0 ? '+' : ''}{category.monthlyGrowth}%
                      </span>
                    </div>
                    
                    {category.budget && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Budget Usage</span>
                          <span className="text-sm text-gray-500">
                            {((category.totalAmount / category.budget) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={(category.totalAmount / category.budget) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <Card className="shadow-lg border-0">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Tag className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No categories found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {searchTerm || selectedType !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first category'
                  }
                </p>
                {!searchTerm && selectedType === 'all' && (
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories; 
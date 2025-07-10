import { useState } from 'react';
import { Plus, Target, TrendingUp, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, BarChart3, Edit, Trash2 } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Layout from '@/components/Layout';

const Goals = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);

  const goals = [
    {
      id: 1,
      title: 'Monthly Sales Target',
      description: 'Achieve KES 500,000 in monthly sales',
      target: 500000,
      current: 450000,
      type: 'income',
      deadline: '2024-01-31',
      status: 'in-progress',
      priority: 'high',
      icon: '🎯',
      color: 'bg-green-500',
      category: 'Sales'
    },
    {
      id: 2,
      title: 'Reduce Transport Costs',
      description: 'Cut transportation expenses by 15%',
      target: 85000,
      current: 96000,
      type: 'expense',
      deadline: '2024-02-29',
      status: 'at-risk',
      priority: 'medium',
      icon: '🚚',
      color: 'bg-red-500',
      category: 'Cost Reduction'
    },
    {
      id: 3,
      title: 'Expand to New Markets',
      description: 'Enter 3 new market segments',
      target: 3,
      current: 1,
      type: 'business',
      deadline: '2024-06-30',
      status: 'in-progress',
      priority: 'high',
      icon: '🌍',
      color: 'bg-blue-500',
      category: 'Growth'
    },
    {
      id: 4,
      title: 'Increase Profit Margin',
      description: 'Achieve 25% profit margin',
      target: 25,
      current: 22,
      type: 'financial',
      deadline: '2024-03-31',
      status: 'on-track',
      priority: 'high',
      icon: '📈',
      color: 'bg-purple-500',
      category: 'Financial'
    },
    {
      id: 5,
      title: 'Customer Satisfaction',
      description: 'Maintain 95% customer satisfaction rate',
      target: 95,
      current: 92,
      type: 'quality',
      deadline: '2024-12-31',
      status: 'in-progress',
      priority: 'medium',
      icon: '😊',
      color: 'bg-yellow-500',
      category: 'Customer'
    },
    {
      id: 6,
      title: 'Emergency Fund',
      description: 'Build 6-month emergency fund',
      target: 3000000,
      current: 1800000,
      type: 'savings',
      deadline: '2024-12-31',
      status: 'on-track',
      priority: 'high',
      icon: '💰',
      color: 'bg-emerald-500',
      category: 'Savings'
    }
  ];

  const formatKES = (value: number) => {
    return `KES ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'on-track':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'at-risk':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-purple-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on-track':
        return 'bg-blue-100 text-blue-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (goal: any) => {
    if (goal.type === 'expense') {
      // For expense goals, we want to reduce, so progress is inverse
      return Math.max(0, Math.min(100, ((goal.target - goal.current) / goal.target) * 100));
    }
    return Math.max(0, Math.min(100, (goal.current / goal.target) * 100));
  };

  const formatValue = (goal: any) => {
    if (goal.type === 'financial' || goal.type === 'quality') {
      return `${goal.current}%`;
    }
    if (goal.type === 'business') {
      return `${goal.current}/${goal.target}`;
    }
    return formatKES(goal.current);
  };

  const formatTarget = (goal: any) => {
    if (goal.type === 'financial' || goal.type === 'quality') {
      return `${goal.target}%`;
    }
    if (goal.type === 'business') {
      return `${goal.target}`;
    }
    return formatKES(goal.target);
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const onTrackGoals = goals.filter(g => g.status === 'on-track').length;
  const atRiskGoals = goals.filter(g => g.status === 'at-risk').length;

  const handleEdit = (goal: any) => {
    setEditingGoal(goal);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (goalId: number) => {
    // In a real app, you'd make an API call here
    console.log('Delete goal:', goalId);
  };

  return (
    <Layout>
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Financial Goals
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">
                Set and track your business and financial objectives
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingGoal ? 'Edit Goal' : 'Add New Goal'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingGoal ? 'Update your goal details' : 'Create a new financial or business goal'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Goal Title</label>
                    <Input 
                      placeholder="Enter goal title"
                      defaultValue={editingGoal?.title || ''}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input 
                      placeholder="Enter goal description"
                      defaultValue={editingGoal?.description || ''}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Target</label>
                      <Input 
                        type="number"
                        placeholder="Enter target value"
                        defaultValue={editingGoal?.target || ''}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Current</label>
                      <Input 
                        type="number"
                        placeholder="Enter current value"
                        defaultValue={editingGoal?.current || ''}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select defaultValue={editingGoal?.type || 'financial'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="quality">Quality</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select defaultValue={editingGoal?.priority || 'medium'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Deadline</label>
                    <Input 
                      type="date"
                      defaultValue={editingGoal?.deadline || ''}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    {editingGoal ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Goals
                </CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {totalGoals}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Active goals
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {completedGoals}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((completedGoals / totalGoals) * 100).toFixed(1)}% success rate
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  On Track
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {onTrackGoals}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Making good progress
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  At Risk
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {atRiskGoals}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Need attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {goals.map((goal) => (
              <Card key={goal.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${goal.color} flex items-center justify-center text-white text-lg`}>
                        {goal.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(goal.status)}>
                            {goal.status.replace('-', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(goal.priority)}>
                            {goal.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Open menu</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(goal)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(goal.id)}
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
                    {goal.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current</span>
                      <span className="text-sm font-semibold text-blue-600">
                        {formatValue(goal)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Target</span>
                      <span className="text-sm font-semibold text-green-600">
                        {formatTarget(goal)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-500">
                          {calculateProgress(goal).toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(goal)} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Deadline</span>
                      <span className="text-sm text-gray-500">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Category</span>
                      <span className="text-sm text-gray-500">
                        {goal.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      {getStatusIcon(goal.status)}
                      <span className="text-xs text-gray-500">
                        {goal.type} goal
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {goals.length === 0 && (
            <Card className="shadow-lg border-0">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No goals set
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  Start by creating your first financial goal
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Goals; 
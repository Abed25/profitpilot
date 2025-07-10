
import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Widgets = () => {
  const [recentTransactions] = useState([
    { id: 1, type: 'income', description: 'Freelance Payment', amount: 1500, date: '2024-01-10', category: 'Work' },
    { id: 2, type: 'expense', description: 'Grocery Shopping', amount: 85, date: '2024-01-09', category: 'Food' },
    { id: 3, type: 'expense', description: 'Gas Station', amount: 45, date: '2024-01-08', category: 'Transportation' },
    { id: 4, type: 'income', description: 'Investment Dividend', amount: 200, date: '2024-01-07', category: 'Investment' },
    { id: 5, type: 'expense', description: 'Netflix Subscription', amount: 15, date: '2024-01-06', category: 'Entertainment' }
  ]);

  const [budgetGoals] = useState([
    { category: 'Food & Dining', spent: 850, budget: 1000, color: 'bg-green-500' },
    { category: 'Transportation', spent: 320, budget: 400, color: 'bg-blue-500' },
    { category: 'Entertainment', spent: 180, budget: 200, color: 'bg-yellow-500' },
    { category: 'Shopping', spent: 450, budget: 300, color: 'bg-red-500' }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Shopping budget exceeded by $150', severity: 'high' },
    { id: 2, type: 'info', message: 'Monthly savings goal 80% complete', severity: 'low' },
    { id: 3, type: 'success', message: 'Investment portfolio up 12% this month', severity: 'low' }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Transactions */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Recent Transactions</span>
            <Badge variant="secondary">5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Budget Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetGoals.map((goal, index) => {
              const percentage = Math.min((goal.spent / goal.budget) * 100, 100);
              const isOverBudget = goal.spent > goal.budget;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.category}</span>
                    <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                      ${goal.spent}/${goal.budget}
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={`h-2 ${isOverBudget ? 'bg-red-100' : ''}`}
                  />
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{percentage.toFixed(0)}% used</span>
                    {isOverBudget && <span className="text-red-600 font-medium">Over budget!</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Alerts & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                alert.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              }`}>
                <p className="text-sm font-medium">{alert.message}</p>
                <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="mt-2">
                  {alert.severity} priority
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Widgets;


import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Widgets = () => {
  const [recentTransactions] = useState([
    { id: 1, type: 'income', description: 'Sales - Maize', amount: 15000, date: '2024-01-10', category: 'Sales' },
    { id: 2, type: 'expense', description: 'M-PESA Charges', amount: 850, date: '2024-01-09', category: 'M-PESA Charges' },
    { id: 3, type: 'expense', description: 'Transport to Market', amount: 450, date: '2024-01-08', category: 'Transport' },
    { id: 4, type: 'income', description: 'Stock Return', amount: 2000, date: '2024-01-07', category: 'Stock' },
    { id: 5, type: 'expense', description: 'Rent Payment', amount: 12000, date: '2024-01-06', category: 'Rent' }
  ]);

  const [budgetGoals] = useState([
    { category: 'Stock', spent: 85000, budget: 100000, color: 'bg-green-500' },
    { category: 'Transport', spent: 32000, budget: 40000, color: 'bg-blue-500' },
    { category: 'Utilities', spent: 18000, budget: 20000, color: 'bg-yellow-500' },
    { category: 'Rent', spent: 45000, budget: 30000, color: 'bg-red-500' }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Gharama za rent zimezidi budget kwa KES 15,000', severity: 'high' },
    { id: 2, type: 'info', message: 'Lengo la akiba la mwezi limefikiwa 80%', severity: 'low' },
    { id: 3, type: 'success', message: 'Mauzo yamezidi kwa 12% mwezi huu', severity: 'low' }
  ]);

  const formatKES = (value: number) => {
    return `KES ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Recent Transactions */}
      <Card className="lg:col-span-2 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Miamala ya Hivi Karibuni</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
                  <TableHead className="font-semibold">Maelezo</TableHead>
                  <TableHead className="font-semibold">Jamii</TableHead>
                  <TableHead className="font-semibold">Tarehe</TableHead>
                  <TableHead className="font-semibold text-right">Kiasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-orange-100 dark:bg-orange-900'}`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{transaction.category}</TableCell>
                    <TableCell className="text-sm text-gray-500">{transaction.date}</TableCell>
                    <TableCell className={`font-semibold text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-orange-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatKES(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Budget Progress */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Maendeleo ya Budget</span>
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
                    <span className={`text-sm font-semibold ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                      {formatKES(goal.spent)}/{formatKES(goal.budget)}
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={`h-2 ${isOverBudget ? 'bg-red-100' : ''}`}
                  />
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{percentage.toFixed(0)}% imetumika</span>
                    {isOverBudget && <span className="text-red-600 font-medium">Umezidi budget!</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="lg:col-span-3 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Arifa na Taarifa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20' :
                alert.type === 'success' ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' :
                'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
              }`}>
                <p className="text-sm font-medium">{alert.message}</p>
                <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="mt-2">
                  {alert.severity === 'high' ? 'muhimu' : 'kawaida'}
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


import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SummaryCards = () => {
  const [animatedValues, setAnimatedValues] = useState({
    income: 0,
    expenses: 0,
    profit: 0,
    trend: 0
  });

  const targetValues = {
    income: 125000,
    expenses: 83000,
    profit: 42000,
    trend: 12.5
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        income: Math.floor(targetValues.income * easeOut),
        expenses: Math.floor(targetValues.expenses * easeOut),
        profit: Math.floor(targetValues.profit * easeOut),
        trend: Number((targetValues.trend * easeOut).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const formatKES = (value: number) => {
    return `KES ${value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const cards = [
    {
      title: 'Total Income',
      value: animatedValues.income,
      icon: TrendingUp,
      color: 'text-green-700',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900',
      change: '+8.2%'
    },
    {
      title: 'Total Expenses',
      value: animatedValues.expenses,
      icon: TrendingDown,
      color: 'text-orange-700',
      bgColor: 'bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900',
      change: '-2.1%'
    },
    {
      title: 'Net Profit',
      value: animatedValues.profit,
      icon: DollarSign,
      color: animatedValues.profit > 0 ? 'text-green-700' : 'text-red-700',
      bgColor: animatedValues.profit > 0 ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900' : 'bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900 dark:to-rose-900',
      change: '+15.3%'
    },
    {
      title: 'Monthly Trend',
      value: animatedValues.trend,
      prefix: '',
      suffix: '%',
      icon: Activity,
      color: 'text-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900',
      change: '+2.4%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400">
              {card.title}
            </CardTitle>
            <div className={`p-2 lg:p-3 rounded-full ${card.bgColor} shadow-inner`}>
              <card.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-1">
              <span className={`text-lg lg:text-2xl font-bold ${card.color} text-right block w-full`}>
                {card.suffix ? 
                  `${card.value.toLocaleString()}${card.suffix}` : 
                  formatKES(card.value)
                }
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">
              <span className={card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                {card.change}
              </span>
              {' '}from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;

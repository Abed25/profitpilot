
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
    income: 12500,
    expenses: 8300,
    profit: 4200,
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

  const cards = [
    {
      title: 'Total Income',
      value: animatedValues.income,
      prefix: '$',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
      change: '+8.2%'
    },
    {
      title: 'Total Expenses',
      value: animatedValues.expenses,
      prefix: '$',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900',
      change: '-2.1%'
    },
    {
      title: 'Net Profit',
      value: animatedValues.profit,
      prefix: '$',
      icon: DollarSign,
      color: animatedValues.profit > 0 ? 'text-green-600' : 'text-red-600',
      bgColor: animatedValues.profit > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900',
      change: '+15.3%'
    },
    {
      title: 'Monthly Trend',
      value: animatedValues.trend,
      prefix: '',
      suffix: '%',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      change: '+2.4%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${card.bgColor}`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl font-bold ${card.color}`}>
                {card.prefix}{card.value.toLocaleString()}{card.suffix}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
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

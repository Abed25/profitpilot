
import { useState, useEffect } from 'react';
import { Lightbulb, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessTips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "Business Tip",
      content: "Record every transaction, big or small. This will help you understand how your business is performing.",
      icon: Lightbulb,
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-r from-yellow-100 to-amber-100"
    },
    {
      title: "M-PESA Awareness",
      content: "Track your M-PESA charges carefully. These costs can add up if not monitored closely.",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-gradient-to-r from-green-100 to-emerald-100"
    },
    {
      title: "Success Story",
      content: "Jane increased her profit by 40% after she started recording her daily expenses. You can do it too!",
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-r from-blue-100 to-cyan-100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 8000); // Change tip every 8 seconds

    return () => clearInterval(timer);
  }, [tips.length]);

  const tip = tips[currentTip];

  return (
    <Card className="mb-6 lg:mb-8 shadow-lg border-0 overflow-hidden">
      <div className={`${tip.bgColor} p-1`}>
        <CardHeader className="bg-white dark:bg-gray-800 m-1 rounded-lg">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <tip.icon className={`w-5 h-5 ${tip.color}`} />
            <span>{tip.title}</span>
            <div className="flex space-x-1 ml-auto">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTip ? tip.color.replace('text-', 'bg-') : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white dark:bg-gray-800 mx-1 mb-1 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {tip.content}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default BusinessTips;

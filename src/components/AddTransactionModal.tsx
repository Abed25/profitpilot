
import { useState } from 'react';
import { Plus, DollarSign, Calendar, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const AddTransactionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(true);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = {
    income: ['Sales', 'Stock Returns', 'Investment', 'Services', 'Other Income'],
    expense: ['Stock', 'Rent', 'Utilities', 'M-PESA Charges', 'Salaries', 'Transport', 'Miscellaneous']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Transaction data:', {
      type: isIncome ? 'income' : 'expense',
      ...formData,
      amount: parseFloat(formData.amount)
    });

    toast({
      title: "Success!",
      description: `${isIncome ? 'Income' : 'Expense'} transaction added successfully.`,
    });

    // Reset form
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Add Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] mx-4">
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
          <DialogDescription>
            Enter your transaction details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Income/Expense Toggle */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
            <Label htmlFor="transaction-type" className="text-sm font-medium">
              Transaction Type
            </Label>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${!isIncome ? 'text-gray-500' : 'font-medium text-green-600'}`}>
                Income
              </span>
              <Switch
                id="transaction-type"
                checked={!isIncome}
                onCheckedChange={(checked) => setIsIncome(!checked)}
              />
              <span className={`text-sm ${isIncome ? 'text-gray-500' : 'font-medium text-red-600'}`}>
                Expense
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KES) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-sm text-gray-400">KES</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="pl-12"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {(isIncome ? categories.income : categories.expense).map((category) => (
                  <SelectItem key={category} value={category}>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>{category}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="description"
                placeholder="Enter transaction details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="pl-9"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="pl-9"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${
                isIncome
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
              }`}
            >
              Add {isIncome ? 'Income' : 'Expense'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;

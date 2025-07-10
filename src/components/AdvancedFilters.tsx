
import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Download, FileSpreadsheet, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdvancedFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchKeyword: '',
    dateFrom: '',
    dateTo: '',
    category: '',
    type: '',
    minAmount: '',
    maxAmount: ''
  });

  const categories = [
    'Stock', 'Sales', 'Rent', 'Utilities', 'M-PESA Charges', 
    'Salaries', 'Transport', 'Services', 'Miscellaneous'
  ];

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      searchKeyword: '',
      dateFrom: '',
      dateTo: '',
      category: '',
      type: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  const exportData = (format: string) => {
    // This would typically trigger an API call to export data
    console.log(`Exporting data in ${format} format with filters:`, filters);
    alert(`Exporting data in ${format} format...`);
  };

  return (
    <Card className="mb-4 lg:mb-6 shadow-lg border-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto font-normal hover:bg-white/50 dark:hover:bg-gray-700/50"
          >
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Vichungio vya Kina</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {activeFiltersCount} active
                </Badge>
              )}
            </div>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Search Keyword */}
              <div className="space-y-2">
                <Label htmlFor="search-keyword">Tafuta kwa Neno</Label>
                <Input
                  id="search-keyword"
                  placeholder="Tafuta katika maelezo..."
                  value={filters.searchKeyword}
                  onChange={(e) => handleFilterChange('searchKeyword', e.target.value)}
                />
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label htmlFor="date-from">Tarehe Kuanzia</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <Label htmlFor="date-to">Tarehe Mpaka</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Jamii</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Jamii zote" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Jamii zote</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transaction Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Aina ya Muamala</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Aina zote" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Aina zote</SelectItem>
                    <SelectItem value="income">Mapato</SelectItem>
                    <SelectItem value="expense">Gharama</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Range */}
              <div className="space-y-2">
                <Label>Kiwango cha Kiasi (KES)</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Chini"
                    type="number"
                    step="0.01"
                    value={filters.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                  />
                  <Input
                    placeholder="Juu"
                    type="number"
                    step="0.01"
                    value={filters.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  disabled={activeFiltersCount === 0}
                  className="flex-1 sm:flex-none"
                >
                  Futa Vichungio
                </Button>
                <Button size="sm" className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Tumia Vichungio
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData('excel')}
                  className="flex-1 sm:flex-none"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-1" />
                  Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData('csv')}
                  className="flex-1 sm:flex-none"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData('pdf')}
                  className="flex-1 sm:flex-none"
                >
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AdvancedFilters;

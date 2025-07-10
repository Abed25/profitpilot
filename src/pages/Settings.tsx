
import { useState } from 'react';
import { User, Mail, Lock, Bell, Palette, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [profile, setProfile] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    budgetAlerts: true,
    language: 'swahili' // English or Swahili
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      toast({
        title: "Kosa",
        description: "Manenosiri mapya hayalingani.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Imefanikiwa!",
      description: "Maelezo ya wasifu yamebadilishwa.",
    });
  };

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setPreferences({ ...preferences, [key]: value });
    toast({
      title: "Mapendeleo Yamebadilishwa",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${typeof value === 'boolean' ? (value ? 'yamewashwa' : 'yamezimwa') : 'yamebadilishwa'}.`,
    });
  };

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Mipangilio
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">
          Dhibiti mipangilio ya akaunti yako na mapendeleo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Profile Settings */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Maelezo ya Wasifu</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Jina la Onyesho</Label>
                <Input
                  id="display-name"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder="Ingiza jina lako la onyesho"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Anwani ya Barua Pepe</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    className="pl-9"
                    disabled
                    placeholder="your.email@example.com"
                  />
                </div>
                <p className="text-xs text-gray-500">Barua pepe haiwezi kubadilishwa</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Badilisha Nywila</span>
                </h4>

                <div className="space-y-2">
                  <Label htmlFor="current-password">Nywila ya Sasa</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={profile.currentPassword}
                    onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                    placeholder="Ingiza nywila ya sasa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nywila Mpya</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    placeholder="Ingiza nywila mpya"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Thibitisha Nywila Mpya</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                    placeholder="Thibitisha nywila mpya"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Sasisha Wasifu
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Mapendeleo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Lugha</span>
              </h4>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="language">Chagua Lugha</Label>
                  <p className="text-sm text-gray-500">Badilisha lugha ya programu</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${preferences.language === 'english' ? 'text-gray-500' : 'font-medium text-green-600'}`}>
                    Kiswahili
                  </span>
                  <Switch
                    id="language"
                    checked={preferences.language === 'english'}
                    onCheckedChange={(checked) => handlePreferenceChange('language', checked ? 'english' : 'swahili')}
                  />
                  <span className={`text-sm ${preferences.language === 'swahili' ? 'text-gray-500' : 'font-medium text-blue-600'}`}>
                    English
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Appearance */}
            <div className="space-y-4">
              <h4 className="font-medium">Muonekano</h4>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="dark-mode">Hali ya Usiku</Label>
                  <p className="text-sm text-gray-500">Tumia mandhari ya giza kwenye programu</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                />
              </div>
            </div>

            <Separator />

            {/* Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Arifa</span>
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-notifications">Arifa za Barua Pepe</Label>
                    <p className="text-sm text-gray-500">Pokea taarifa kupitia barua pepe</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="budget-alerts">Arifa za Budget</Label>
                    <p className="text-sm text-gray-500">Pokea taarifa unapokaribia mipaka ya budget</p>
                  </div>
                  <Switch
                    id="budget-alerts"
                    checked={preferences.budgetAlerts}
                    onCheckedChange={(checked) => handlePreferenceChange('budgetAlerts', checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Security */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Usalama</span>
              </h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Washa Uthibitisho wa Hatua Mbili
                </Button>
                <Button variant="outline" className="w-full">
                  Pakua Data ya Akaunti
                </Button>
                <Button variant="destructive" className="w-full">
                  Futa Akaunti
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

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
    language: 'english' // Changed from 'swahili' to 'english'
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
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 lg:mt-2 text-sm lg:text-base">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Profile Settings */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder="Enter your display name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Change Password</span>
                </h4>

                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={profile.currentPassword}
                    onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Language</span>
              </h4>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="language">Choose Language</Label>
                  <p className="text-sm text-gray-500">Change the application language</p>
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
              <h4 className="font-medium">Appearance</h4>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Use dark theme across the application</p>
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
                <span>Notifications</span>
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="budget-alerts">Budget Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified when approaching budget limits</p>
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
                <span>Security</span>
              </h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full">
                  Download Account Data
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
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

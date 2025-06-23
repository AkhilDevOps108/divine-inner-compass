
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Sunrise, 
  Sunset, 
  Clock, 
  Moon, 
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PracticeSession {
  id: string;
  name: string;
  description: string;
  icon: any;
  defaultTime: string;
  customTime: string;
  enabled: boolean;
  completed: boolean;
  gradient: string;
}

const DailyPracticeScheduler = () => {
  const { toast } = useToast();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [practices, setPractices] = useState<PracticeSession[]>([
    {
      id: "morning",
      name: "Morning Meditation",
      description: "Point B Meditation - Before sunrise with divine transmission",
      icon: Sunrise,
      defaultTime: "05:30",
      customTime: "05:30",
      enabled: true,
      completed: false,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: "evening",
      name: "Evening Cleaning",
      description: "Remove impressions of the day - After sunset",
      icon: Sunset,
      defaultTime: "19:00",
      customTime: "19:00",
      enabled: true,
      completed: false,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: "prayer",
      name: "9 PM Prayer",
      description: "Universal Prayer for all humanity",
      icon: Clock,
      defaultTime: "21:00",
      customTime: "21:00",
      enabled: true,
      completed: false,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "night",
      name: "Night Meditation",
      description: "Point A Meditation and Night Prayer before sleep",
      icon: Moon,
      defaultTime: "22:00",
      customTime: "22:00",
      enabled: true,
      completed: false,
      gradient: "from-indigo-600 to-purple-600"
    }
  ]);

  const togglePractice = (id: string) => {
    setPractices(prev => 
      prev.map(practice => 
        practice.id === id 
          ? { ...practice, enabled: !practice.enabled }
          : practice
      )
    );
  };

  const updateTime = (id: string, time: string) => {
    setPractices(prev => 
      prev.map(practice => 
        practice.id === id 
          ? { ...practice, customTime: time }
          : practice
      )
    );
  };

  const markCompleted = (id: string) => {
    setPractices(prev => 
      prev.map(practice => 
        practice.id === id 
          ? { ...practice, completed: !practice.completed }
          : practice
      )
    );
    
    const practice = practices.find(p => p.id === id);
    if (practice) {
      toast({
        title: "🙏 Practice Completed",
        description: `${practice.name} marked as complete. May divine love fill your heart.`,
      });
    }
  };

  const testNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("🔔 Sahaj Marg Reminder", {
        body: "Time for your meditation practice. Come with love and surrender.",
        icon: "/placeholder.svg"
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("🔔 Sahaj Marg Reminder", {
            body: "Notifications enabled! You'll receive gentle reminders for your practice.",
            icon: "/placeholder.svg"
          });
        }
      });
    }
    
    toast({
      title: "Test Notification Sent",
      description: "Check your browser notifications. Enable them for gentle practice reminders.",
    });
  };

  useEffect(() => {
    // Request notification permission on component mount
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Daily Practice Scheduler
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure your daily spiritual practice with gentle reminders
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Settings */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="h-5 w-5 text-blue-600" />
              ) : (
                <VolumeX className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium">Divine Sound Notifications</p>
                <p className="text-sm text-gray-600">Gentle bells and mantras</p>
              </div>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={testNotification} variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Test Notification
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Advanced Settings
            </Button>
          </div>

          <Separator />

          {/* Practice Sessions */}
          <div className="space-y-4">
            {practices.map((practice) => {
              const IconComponent = practice.icon;
              return (
                <Card key={practice.id} className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${practice.gradient}`} />
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${practice.gradient} text-white`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{practice.name}</h3>
                            {practice.completed && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {practice.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <input
                              type="time"
                              value={practice.customTime}
                              onChange={(e) => updateTime(practice.id, e.target.value)}
                              disabled={!practice.enabled}
                              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
                            />
                            <Switch
                              checked={practice.enabled}
                              onCheckedChange={() => togglePractice(practice.id)}
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={practice.completed ? "outline" : "default"}
                        size="sm"
                        onClick={() => markCompleted(practice.id)}
                        className={practice.completed ? "" : `bg-gradient-to-r ${practice.gradient} hover:opacity-90`}
                      >
                        {practice.completed ? "Undo" : "Complete"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-medium text-blue-800 mb-2">Divine Guidance</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              "The morning meditation connects you to the divine source. The evening cleaning removes the day's impressions. 
              The 9 PM prayer unites all hearts in love. The night meditation prepares the soul for divine dreams."
            </p>
            <p className="text-xs text-blue-600 mt-2 italic">- Master's Teaching</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyPracticeScheduler;

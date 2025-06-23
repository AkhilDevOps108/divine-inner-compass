
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Clock, 
  Heart, 
  Sunrise, 
  Sunset, 
  Moon, 
  Play, 
  Pause,
  Calendar,
  BookOpen,
  Users
} from "lucide-react";
import DailyPracticeScheduler from "@/components/DailyPracticeScheduler";
import MeditationTimer from "@/components/MeditationTimer";
import GuidedSessions from "@/components/GuidedSessions";
import ProgressTracker from "@/components/ProgressTracker";
import KnowledgeHub from "@/components/KnowledgeHub";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState("dashboard");
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return "dawn";
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    if (hour < 21) return "evening";
    return "night";
  };

  const getGreeting = () => {
    const timeOfDay = getTimeOfDay();
    const greetings = {
      dawn: "Sacred Dawn Awakens",
      morning: "Divine Morning Light",
      afternoon: "Peaceful Afternoon",
      evening: "Blessed Evening",
      night: "Peaceful Night"
    };
    return greetings[timeOfDay];
  };

  const todaysThought = "Love alone is capable of uniting living beings in such a way as to complete and fulfill them, for it alone takes them and joins them by what is deepest in themselves. - Master Chariji";

  const renderActiveSection = () => {
    switch (activeSection) {
      case "scheduler":
        return <DailyPracticeScheduler />;
      case "timer":
        return <MeditationTimer />;
      case "guided":
        return <GuidedSessions />;
      case "progress":
        return <ProgressTracker />;
      case "knowledge":
        return <KnowledgeHub />;
      default:
        return (
          <div className="space-y-6">
            {/* Today's Thought */}
            <Card className="bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  Today's Divine Thought
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 italic leading-relaxed">
                  {todaysThought}
                </p>
              </CardContent>
            </Card>

            {/* Daily Practice Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Today's Practice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <Sunrise className="h-6 w-6 text-amber-600" />
                    <div>
                      <p className="font-medium text-amber-800">Morning Meditation</p>
                      <p className="text-sm text-amber-600">Before sunrise</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Pending</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Sunset className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Evening Cleaning</p>
                      <p className="text-sm text-blue-600">After sunset</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Pending</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-800">9 PM Prayer</p>
                      <p className="text-sm text-purple-600">Universal Prayer</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Pending</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <Moon className="h-6 w-6 text-indigo-600" />
                    <div>
                      <p className="font-medium text-indigo-800">Night Meditation</p>
                      <p className="text-sm text-indigo-600">Point A & Prayer</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setActiveSection("timer")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Meditation
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveSection("guided")}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Guided Session
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => toast({
                      title: "Satsang Reminder",
                      description: "Next group sitting is today at 7 PM. Join with an open heart.",
                    })}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Satsang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pranahuti
              </h1>
              <p className="text-sm text-gray-600 mt-1">{getGreeting()}</p>
            </div>
            
            {/* Beating Heart Animation */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Heart 
                className="h-8 w-8 text-rose-500 animate-pulse" 
                fill="currentColor"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              />
            </div>
            
            <div className="text-right">
              <p className="text-lg font-medium text-gray-800">
                {currentTime.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Practice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeSection === "dashboard" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("dashboard")}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={activeSection === "scheduler" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("scheduler")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Daily Schedule
                </Button>
                <Button
                  variant={activeSection === "timer" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("timer")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Meditation Timer
                </Button>
                <Button
                  variant={activeSection === "guided" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("guided")}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Guided Sessions
                </Button>
                <Button
                  variant={activeSection === "progress" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("progress")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Progress
                </Button>
                <Button
                  variant={activeSection === "knowledge" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("knowledge")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Knowledge Hub
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

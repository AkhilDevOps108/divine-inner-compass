
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  TrendingUp, 
  Heart, 
  Award,
  Star,
  Clock,
  Flame
} from "lucide-react";

const ProgressTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState("current");

  // Mock data - in a real app, this would come from a database
  const stats = {
    currentStreak: 7,
    longestStreak: 21,
    totalSessions: 156,
    thisMonth: 28,
    avgDuration: 25,
    consistency: 85
  };

  const monthlyData = [
    { month: "Jan", sessions: 25, consistency: 80 },
    { month: "Feb", sessions: 28, consistency: 85 },
    { month: "Mar", sessions: 30, consistency: 90 },
    { month: "Apr", sessions: 28, consistency: 85 },
    { month: "May", sessions: 32, consistency: 95 },
    { month: "Jun", sessions: 28, consistency: 85 }
  ];

  const recentSessions = [
    { date: "Today", type: "Morning Meditation", duration: 30, mood: "peaceful", completed: true },
    { date: "Yesterday", type: "Evening Cleaning", duration: 15, mood: "grateful", completed: true },
    { date: "Yesterday", type: "Night Meditation", duration: 25, mood: "serene", completed: true },
    { date: "2 days ago", type: "Morning Meditation", duration: 30, mood: "focused", completed: true },
    { date: "2 days ago", type: "9 PM Prayer", duration: 10, mood: "loving", completed: true }
  ];

  const achievements = [
    { id: 1, title: "First Week", description: "Completed 7 consecutive days", icon: "🌱", earned: true },
    { id: 2, title: "Devoted Heart", description: "50 meditation sessions", icon: "💖", earned: true },
    { id: 3, title: "Morning Warrior", description: "30 morning meditations", icon: "🌅", earned: true },
    { id: 4, title: "Consistent Soul", description: "21-day streak", icon: "🔥", earned: true },
    { id: 5, title: "Hundred Hearts", description: "100 total sessions", icon: "💯", earned: true },
    { id: 6, title: "Master's Grace", description: "6 months of practice", icon: "🙏", earned: false }
  ];

  const getMoodColor = (mood: string) => {
    const colors = {
      peaceful: "bg-blue-100 text-blue-800",
      grateful: "bg-green-100 text-green-800",
      serene: "bg-purple-100 text-purple-800",
      focused: "bg-orange-100 text-orange-800",
      loving: "bg-pink-100 text-pink-800"
    };
    return colors[mood as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Practice Progress
          </CardTitle>
          <p className="text-sm text-gray-600">
            Track your spiritual journey with love, not competition
          </p>
        </CardHeader>
      </Card>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-800">{stats.currentStreak}</p>
            <p className="text-sm text-orange-600">Current Streak</p>
            <p className="text-xs text-orange-500 mt-1">Days of consistent practice</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-800">{stats.totalSessions}</p>
            <p className="text-sm text-blue-600">Total Sessions</p>
            <p className="text-xs text-blue-500 mt-1">Moments with the divine</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-800">{stats.avgDuration}</p>
            <p className="text-sm text-green-600">Avg Duration</p>
            <p className="text-xs text-green-500 mt-1">Minutes per session</p>
          </CardContent>
        </Card>
      </div>

      {/* Consistency Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            This Month's Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Practice Consistency</span>
            <span className="text-sm text-gray-600">{stats.consistency}%</span>
          </div>
          <Progress value={stats.consistency} className="h-2" />
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-800">{stats.thisMonth}</p>
              <p className="text-sm text-blue-600">Sessions this month</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-800">{stats.longestStreak}</p>
              <p className="text-sm text-purple-600">Longest streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Recent Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">{session.type}</p>
                    <p className="text-xs text-gray-600">{session.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`text-xs ${getMoodColor(session.mood)}`}>
                    {session.mood}
                  </Badge>
                  <span className="text-sm text-gray-600">{session.duration}min</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Milestones of Grace
          </CardTitle>
          <p className="text-sm text-gray-600">
            Gentle acknowledgments of your dedicated practice
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned 
                    ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-200" 
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h3 className={`font-medium ${achievement.earned ? "text-green-800" : "text-gray-600"}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? "text-green-600" : "text-gray-500"}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gentle Reminder */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <Star className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-medium text-purple-800 mb-2">Remember with Humility</h3>
            <p className="text-sm text-purple-700 leading-relaxed">
              Progress is not about numbers or achievements, but about the gradual opening of the heart. 
              Every moment spent in practice is a gift of grace. Approach your journey with love, not comparison.
            </p>
            <p className="text-xs text-purple-600 mt-3 italic">
              "The goal is not perfection, but sincere effort with love." - Master's Teaching
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;


import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Heart,
  Volume2,
  VolumeX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MeditationTimer = () => {
  const { toast } = useToast();
  const [duration, setDuration] = useState(1800); // 30 minutes default
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionType, setSessionType] = useState("meditation");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const presetDurations = [
    { label: "10 min", value: 600, type: "quick" },
    { label: "20 min", value: 1200, type: "regular" },
    { label: "30 min", value: 1800, type: "meditation" },
    { label: "45 min", value: 2700, type: "deep" },
    { label: "1 hour", value: 3600, type: "extended" }
  ];

  const sessionTypes = [
    { id: "meditation", name: "Point B Meditation", color: "from-blue-500 to-cyan-500" },
    { id: "cleaning", name: "Evening Cleaning", color: "from-orange-500 to-red-500" },
    { id: "prayer", name: "Prayer Session", color: "from-purple-500 to-pink-500" },
    { id: "pointA", name: "Point A Meditation", color: "from-indigo-500 to-purple-600" }
  ];

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setIsPaused(false);
            playCompletionSound();
            toast({
              title: "🙏 Session Complete",
              description: "Your meditation session is complete. May divine love remain with you.",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, timeLeft]);

  const playCompletionSound = () => {
    if (soundEnabled) {
      // In a real app, you would play an actual sound file
      // For now, we'll use a toast notification
      console.log("Playing divine bell sound...");
    }
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
    toast({
      title: "🧘‍♀️ Session Started",
      description: "Find a comfortable position and let your heart be open to divine transmission.",
    });
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;
  const currentSessionType = sessionTypes.find(type => type.id === sessionType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Meditation Timer
          </CardTitle>
          <p className="text-sm text-gray-600">
            A sacred space for your daily practice
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Type Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Practice Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {sessionTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={sessionType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSessionType(type.id)}
                  className={sessionType === type.id ? `bg-gradient-to-r ${type.color} text-white` : ""}
                  disabled={isActive}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Duration Presets */}
          <div>
            <h3 className="text-sm font-medium mb-3">Duration</h3>
            <div className="flex flex-wrap gap-2">
              {presetDurations.map((preset) => (
                <Button
                  key={preset.value}
                  variant={duration === preset.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setDuration(preset.value);
                    setTimeLeft(preset.value);
                  }}
                  disabled={isActive}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Timer Display */}
          <Card className={`bg-gradient-to-br ${currentSessionType?.color} text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10" />
            <CardContent className="pt-8 pb-8 text-center relative z-10">
              <div className="mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {currentSessionType?.name}
                </Badge>
              </div>
              
              <div className="text-6xl font-light mb-4 font-mono">
                {formatTime(timeLeft)}
              </div>
              
              <Progress 
                value={progress} 
                className="mb-6 bg-white/20"
              />
              
              <div className="flex justify-center gap-3">
                {!isActive ? (
                  <Button
                    onClick={startTimer}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Begin Practice
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={pauseTimer}
                      size="lg"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      {isPaused ? (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={stopTimer}
                      size="lg"
                      variant="outline"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Square className="h-5 w-5 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="h-5 w-5 text-blue-600" />
              ) : (
                <VolumeX className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium">Completion Bell</p>
                <p className="text-sm text-gray-600">Divine sound at session end</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guidance Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Heart className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-purple-800 mb-2">Meditation Guidance</h3>
              <div className="text-sm text-purple-700 space-y-2">
                <p>• Sit comfortably with your back straight</p>
                <p>• Close your eyes gently and turn your attention inward</p>
                <p>• Feel the divine light in your heart</p>
                <p>• Surrender to the Master's transmission with love</p>
                <p>• Let thoughts come and go without resistance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeditationTimer;

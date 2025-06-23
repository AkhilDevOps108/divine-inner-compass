
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  BookOpen, 
  Heart, 
  Sunrise, 
  Sunset, 
  Clock, 
  Moon,
  Volume2,
  Headphones
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuidedSession {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "meditation" | "cleaning" | "prayer";
  icon: any;
  difficulty: "beginner" | "intermediate" | "advanced";
  transcript: string;
  color: string;
}

const GuidedSessions = () => {
  const { toast } = useToast();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sessions: GuidedSession[] = [
    {
      id: "morning-meditation",
      title: "Morning Meditation - Point B",
      description: "Connect with divine transmission at the heart center",
      duration: "20 min",
      type: "meditation",
      icon: Sunrise,
      difficulty: "beginner",
      color: "from-amber-500 to-orange-500",
      transcript: `Welcome to your morning meditation practice. 

Find a comfortable seated position with your back straight and natural. Close your eyes gently.

Bring your attention to your heart, to the center of your chest. This is Point B, the seat of divine love.

Feel the presence of the Master's grace flowing into your heart. Don't strain or force anything. Simply be receptive.

If thoughts arise, gently acknowledge them and return to the heart. The Master's transmission is always available to those who approach with love and humility.

Allow yourself to be absorbed in this divine current flowing through your being. Rest in this sacred presence.

When you're ready, slowly bring your awareness back to your surroundings. Take a moment to express gratitude for this divine gift.`
    },
    {
      id: "evening-cleaning",
      title: "Evening Cleaning Practice",
      description: "Remove the day's impressions with divine light",
      duration: "15 min",
      type: "cleaning",
      icon: Sunset,
      difficulty: "beginner",
      color: "from-blue-500 to-indigo-500",
      transcript: `Welcome to the evening cleaning practice. This sacred process helps remove the impressions gathered throughout the day.

Sit comfortably and close your eyes. Take a few deep, natural breaths.

Imagine a brilliant divine light entering from the back of your head, flowing down through your entire body.

This light is cleaning away all the heaviness, stress, and impressions from the day. See it flowing through every cell, every organ, purifying your entire being.

Watch as this light carries away all the worries, tensions, and unnecessary thoughts from today. Let them flow out through your toes and into the earth.

Continue this process, allowing the divine light to cleanse and purify your system completely.

Feel yourself becoming lighter, cleaner, more peaceful with each moment.

When complete, rest in this state of purity and lightness. Express gratitude for this divine cleaning.`
    },
    {
      id: "nine-pm-prayer",
      title: "Universal Prayer at 9 PM",
      description: "Join hearts worldwide in prayer for humanity",
      duration: "10 min",
      type: "prayer",
      icon: Clock,
      difficulty: "beginner",
      color: "from-purple-500 to-pink-500",
      transcript: `It is 9 PM - time for our universal prayer. Let us join hearts with seekers around the world.

Sit quietly and bring your attention to your heart. Feel the presence of the Master.

Now, with deep love and compassion, pray for all of humanity:

"O Master, may all beings be free from suffering. May all hearts be filled with love and peace. May humanity awaken to its divine nature. May your grace flow to every corner of the earth, touching every soul with your divine love."

Feel your heart expanding with love for all creation. Send this love to your family, friends, and even those who may have caused you difficulty.

Extend your love to all seekers on the path, to all spiritual traditions, to all beings everywhere.

Rest in this universal love, knowing that our collective prayer has power to transform the world.

When ready, slowly return your attention to your surroundings, carrying this love with you.`
    },
    {
      id: "point-a-meditation",
      title: "Night Meditation - Point A",
      description: "Evening practice at the seat of divine wisdom",
      duration: "25 min",
      type: "meditation",
      icon: Moon,
      difficulty: "intermediate",
      color: "from-indigo-600 to-purple-600",
      transcript: `Welcome to your night meditation at Point A. This practice connects you with divine wisdom and prepares your consciousness for rest.

Sit comfortably with your spine naturally straight. Close your eyes and take a few gentle breaths.

Bring your attention to the top of your head, to Point A. This is the seat of divine illumination and wisdom.

Feel the Master's presence above and within you. Allow divine light to descend from above, filling your consciousness.

This is not a mental practice - simply be receptive to the Master's grace at this center. Rest in divine awareness.

If you feel drowsy, it's natural. Allow the consciousness to be absorbed in the divine current flowing through Point A.

Let go of the day completely. Surrender all concerns, all planning, all thinking to the Master's care.

Rest in this divine embrace, allowing the higher consciousness to prepare your soul for divine sleep and dreams.

When ready, slowly conclude with gratitude, knowing that the Master's grace will continue to work through the night.`
    }
  ];

  const startSession = (sessionId: string) => {
    setSelectedSession(sessionId);
    setIsPlaying(true);
    
    const session = sessions.find(s => s.id === sessionId);
    toast({
      title: "🧘‍♀️ Guided Session Started",
      description: `Beginning ${session?.title}. Follow the gentle guidance with an open heart.`,
    });
  };

  const stopSession = () => {
    setIsPlaying(false);
    setSelectedSession(null);
    toast({
      title: "Session Complete",
      description: "Thank you for your dedicated practice. May divine love remain with you.",
    });
  };

  const activeSession = sessions.find(s => s.id === selectedSession);

  if (isPlaying && activeSession) {
    return (
      <div className="space-y-6">
        <Card className={`bg-gradient-to-br ${activeSession.color} text-white`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <activeSession.icon className="h-6 w-6" />
              {activeSession.title}
            </CardTitle>
            <p className="text-white/90">{activeSession.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="animate-pulse">
                <Headphones className="h-12 w-12 text-white/80" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">Session in Progress</p>
                <p className="text-white/80">{activeSession.duration} duration</p>
              </div>
            </div>
            
            <Button
              onClick={stopSession}
              variant="outline"
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              End Session
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Guidance Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {activeSession.transcript.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-600" />
            Guided Sessions
          </CardTitle>
          <p className="text-sm text-gray-600">
            Follow gentle voice guidance for your daily practices
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {sessions.map((session) => {
          const IconComponent = session.icon;
          return (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${session.color} text-white flex-shrink-0`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{session.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {session.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {session.duration}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{session.description}</p>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => startSession(session.id)}
                        className={`bg-gradient-to-r ${session.color} hover:opacity-90`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Session
                      </Button>
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Heart className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-800 mb-2">Practice with Devotion</h3>
              <p className="text-sm text-green-700 leading-relaxed">
                Approach each session with love, humility, and openness. The Master's grace flows to hearts 
                that are receptive. Don't worry about perfection - sincere effort with love is what matters most.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidedSessions;

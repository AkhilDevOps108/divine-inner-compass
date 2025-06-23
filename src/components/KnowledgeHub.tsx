
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, Star, Clock, Download } from "lucide-react";

const KnowledgeHub = () => {
  const masterTexts = [
    {
      title: "Complete Works of Ram Chandra - Volume 1",
      author: "Babuji Maharaj",
      category: "Foundation",
      readTime: "2 hours",
      description: "Essential teachings on the fundamentals of Sahaj Marg practice"
    },
    {
      title: "Reality at Dawn",
      author: "Babuji Maharaj", 
      category: "Philosophy",
      readTime: "3 hours",
      description: "Deep insights into the spiritual reality and human consciousness"
    },
    {
      title: "Ten Maxims of Sahaj Marg",
      author: "Babuji Maharaj",
      category: "Practice",
      readTime: "30 minutes",
      description: "Practical guidance for daily spiritual living"
    }
  ];

  const todaysThought = "The heart is the field of action. It is there that transformation is brought about, where the Divine culture is best developed.";

  return (
    <div className="space-y-6">
      {/* Today's Divine Thought */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-600" />
            Today's Divine Wisdom
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 italic leading-relaxed">
            "{todaysThought}"
          </p>
          <p className="text-sm text-amber-600 mt-2">- Babuji Maharaj</p>
        </CardContent>
      </Card>

      {/* Master's Texts Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Sacred Texts & Teachings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {masterTexts.map((text, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-xs">
                        {text.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {text.readTime}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800 leading-tight">
                        {text.title}
                      </h3>
                      <p className="text-xs text-blue-600 mt-1">{text.author}</p>
                    </div>
                    
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {text.description}
                    </p>
                    
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-3 w-3 mr-2" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            Practice Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Ten Maxims</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  Rise before dawn and meditate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  Take everything as coming from the Divine
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  Be plain and simple
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  Be truthful and lead life with love
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Daily Practice</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Morning meditation before sunrise
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Evening cleaning after sunset
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  9 PM universal prayer
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Bedtime meditation on Point A
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeHub;

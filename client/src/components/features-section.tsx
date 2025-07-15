import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Star, 
  MapPin, 
  Book, 
  TrendingUp, 
  Wifi 
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Scanning",
      description: "AI-powered waste identification and categorization system",
      icon: QrCode,
      gradient: "from-eco-green to-eco-blue",
      metric: { label: "Accuracy Rate", value: "98.5%" }
    },
    {
      title: "Reward System",
      description: "Gamified points system with exciting rewards and bonuses",
      icon: Star,
      gradient: "from-eco-amber to-eco-red",
      metric: { label: "Daily Bonus", value: "+50 pts" }
    },
    {
      title: "Shop Locator",
      description: "Find nearby partner shops and collection points easily",
      icon: MapPin,
      gradient: "from-eco-purple to-eco-blue",
      metric: { label: "Nearby Shops", value: "12 found" }
    },
    {
      title: "Book Marketplace",
      description: "Buy and sell used books at half price with points",
      icon: Book,
      gradient: "from-eco-green to-eco-purple",
      metric: { label: "Books Available", value: "2,500+" }
    },
    {
      title: "User Dashboard",
      description: "Track your impact, earnings, and environmental contribution",
      icon: TrendingUp,
      gradient: "from-eco-blue to-eco-green",
      metric: { label: "CO2 Saved", value: "125 kg" }
    },
    {
      title: "Offline Mode",
      description: "Works even with poor internet connectivity in rural areas",
      icon: Wifi,
      gradient: "from-eco-red to-eco-amber",
      metric: { label: "Offline Sessions", value: "Unlimited" }
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-eco-green to-eco-blue bg-clip-text text-transparent">
              Amazing Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to transform waste management in your community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`bg-gradient-to-br ${feature.gradient} text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all`}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/90 mb-6">{feature.description}</p>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{feature.metric.label}</span>
                    <span className="font-bold">{feature.metric.value}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

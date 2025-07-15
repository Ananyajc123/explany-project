import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Store, Coins, Leaf } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-eco-green/10 via-eco-blue/10 to-eco-purple/10 animate-pulse-slow"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="gradient-text animate-pulse-slow">
                Turn Waste
              </span>
              <br />
              <span className="text-gray-800">Into Wealth!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Revolutionary mobile app connecting rural communities with sustainable waste management. 
              Scan, earn, redeem - it's that simple!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/scan">
                <Button className="bg-gradient-eco-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all animate-bounce-slow">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              </Link>
              <Link href="/shops">
                <Button className="border-2 border-eco-green text-eco-green px-8 py-4 rounded-full font-bold text-lg hover:bg-eco-green hover:text-white transition-all">
                  <Store className="w-5 h-5 mr-2" />
                  Find Shops
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Hero Image */}
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                alt="Rural waste management scene" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-green/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <Card className="glass-effect">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-eco-green font-bold">Points Earned Today</span>
                      <span className="text-2xl font-black text-eco-green">+245</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-eco-amber rounded-full flex items-center justify-center shadow-lg animate-float">
              <Coins className="text-white text-2xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-eco-purple rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
              <Leaf className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

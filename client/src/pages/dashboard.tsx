import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/navbar";
import PointTracker from "@/components/point-tracker";
import { 
  Leaf, 
  Coins, 
  TrendingUp, 
  Recycle, 
  ShoppingCart, 
  Award,
  Target,
  Calendar
} from "lucide-react";

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['/api/users/1'],
  });

  const { data: wasteItems } = useQuery({
    queryKey: ['/api/waste-items/user/1'],
  });

  const { data: transactions } = useQuery({
    queryKey: ['/api/transactions/user/1'],
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      title: "Total Points",
      value: user.points || 0,
      icon: Coins,
      color: "text-eco-amber",
      bgColor: "bg-eco-amber/10"
    },
    {
      title: "Total Earned",
      value: `₹${user.totalEarned || 0}`,
      icon: TrendingUp,
      color: "text-eco-green",
      bgColor: "bg-eco-green/10"
    },
    {
      title: "CO2 Saved",
      value: `${user.co2Saved || 0} kg`,
      icon: Leaf,
      color: "text-eco-blue",
      bgColor: "bg-eco-blue/10"
    },
    {
      title: "Items Recycled",
      value: wasteItems?.length || 0,
      icon: Recycle,
      color: "text-eco-purple",
      bgColor: "bg-eco-purple/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600">
            Track your environmental impact and earnings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Point Tracker */}
        <PointTracker points={user.points || 0} />

        {/* Main Content */}
        <Tabs defaultValue="activity" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wasteItems?.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                        <div>
                          <p className="font-medium">Waste Item Scanned</p>
                          <p className="text-sm text-gray-600">
                            {item.weight}kg - {item.pointsEarned} points earned
                          </p>
                        </div>
                      </div>
                      <Badge variant={item.status === 'verified' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                  {(!wasteItems || wasteItems.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      No recent activity. Start scanning waste to earn points!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Weekly Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Points Target</span>
                        <span className="text-sm text-gray-600">150/200</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Items Recycled</span>
                        <span className="text-sm text-gray-600">8/10</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Monthly Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">CO2 Reduction</span>
                        <span className="text-sm text-gray-600">12.5/20 kg</span>
                      </div>
                      <Progress value={62.5} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Complete to earn 100 bonus points!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-eco-green/10 to-eco-blue/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-eco-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Recycle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">First Scan</h3>
                  <p className="text-sm text-gray-600">Scanned your first waste item</p>
                  <Badge className="mt-2">Unlocked</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-eco-amber/10 to-eco-purple/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-eco-amber rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Point Collector</h3>
                  <p className="text-sm text-gray-600">Earned 100 points</p>
                  <Badge className="mt-2">Unlocked</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-eco-blue/10 to-eco-purple/10 opacity-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Eco Champion</h3>
                  <p className="text-sm text-gray-600">Earn 1000 points</p>
                  <Badge variant="secondary" className="mt-2">Locked</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

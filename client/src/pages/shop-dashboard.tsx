import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/navbar";
import { 
  Store,
  Package,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";

export default function ShopDashboard() {
  const { data: shop } = useQuery({
    queryKey: ['/api/shops/1'],
  });

  const { data: wasteItems } = useQuery({
    queryKey: ['/api/waste-items/shop/1'],
  });

  const { data: pointRedemptions } = useQuery({
    queryKey: ['/api/point-redemptions/user/1'],
  });

  const stats = [
    {
      title: "Total Waste Collected",
      value: wasteItems?.length || 0,
      icon: Package,
      color: "text-eco-green",
      bgColor: "bg-eco-green/10"
    },
    {
      title: "Points Distributed",
      value: shop?.pointsDistributed || 0,
      icon: TrendingUp,
      color: "text-eco-blue",
      bgColor: "bg-eco-blue/10"
    },
    {
      title: "Active Customers",
      value: 125,
      icon: Users,
      color: "text-eco-purple",
      bgColor: "bg-eco-purple/10"
    },
    {
      title: "Today's Collections",
      value: 8,
      icon: Clock,
      color: "text-eco-amber",
      bgColor: "bg-eco-amber/10"
    }
  ];

  const pendingItems = wasteItems?.filter(item => item.status === 'pending') || [];
  const verifiedItems = wasteItems?.filter(item => item.status === 'verified') || [];
  const collectedItems = wasteItems?.filter(item => item.status === 'collected') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shop Dashboard
          </h1>
          <p className="text-gray-600">
            Manage waste collections and customer interactions
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

        {/* Shop Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5" />
              Shop Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">{shop?.name || 'Loading...'}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Address:</span> {shop?.address}</p>
                  <p><span className="font-medium">Phone:</span> {shop?.phone}</p>
                  <p><span className="font-medium">Status:</span> 
                    <Badge variant={shop?.isActive ? 'default' : 'secondary'} className="ml-2">
                      {shop?.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Collection Rate</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Customer Satisfaction</span>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pending ({pendingItems.length})
            </TabsTrigger>
            <TabsTrigger value="verified">
              Verified ({verifiedItems.length})
            </TabsTrigger>
            <TabsTrigger value="collected">
              Collected ({collectedItems.length})
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Pending Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-eco-amber rounded-full"></div>
                          <div>
                            <p className="font-medium">Waste Item #{item.id}</p>
                            <p className="text-sm text-gray-600">
                              Weight: {item.weight}kg | Points: {item.pointsEarned}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-eco-green hover:bg-eco-green/80">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verify
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No pending items to verify
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verified" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Verified Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verifiedItems.map((item) => (
                    <div key={item.id} className="p-4 bg-eco-green/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                          <div>
                            <p className="font-medium">Waste Item #{item.id}</p>
                            <p className="text-sm text-gray-600">
                              Weight: {item.weight}kg | Points: {item.pointsEarned}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-eco-green">Verified</Badge>
                      </div>
                    </div>
                  ))}
                  {verifiedItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No verified items yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collected" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Collected Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collectedItems.map((item) => (
                    <div key={item.id} className="p-4 bg-eco-blue/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-eco-blue rounded-full"></div>
                          <div>
                            <p className="font-medium">Waste Item #{item.id}</p>
                            <p className="text-sm text-gray-600">
                              Weight: {item.weight}kg | Points: {item.pointsEarned}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-eco-blue">Collected</Badge>
                      </div>
                    </div>
                  ))}
                  {collectedItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No collected items yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Weekly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Chart placeholder</p>
                      <p className="text-sm text-gray-500">Analytics visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Waste Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Plastic Bottles</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">E-Waste</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Metal Cans</span>
                      <div className="flex items-center gap-2">
                        <Progress value={30} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">30%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

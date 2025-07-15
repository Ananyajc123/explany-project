import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import ShopCard from "@/components/shop-card";
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation,
  Phone,
  Clock,
  Star
} from "lucide-react";

export default function ShopLocator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState(true);

  const { data: shops } = useQuery({
    queryKey: ['/api/shops'],
  });

  const filteredShops = shops?.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterActive || shop.isActive;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Find Partner Shops
          </h1>
          <p className="text-gray-600">
            Locate nearby shops where you can drop off your waste and redeem points
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search shops by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={filterActive ? "default" : "outline"}
            onClick={() => setFilterActive(!filterActive)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Active Only
          </Button>
          <Button className="flex items-center gap-2 bg-eco-blue hover:bg-eco-blue/80">
            <Navigation className="w-4 h-4" />
            Use My Location
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-eco-green/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-eco-green" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Shops</p>
                  <p className="text-2xl font-bold text-gray-800">{shops?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-eco-blue/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-eco-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Open Now</p>
                  <p className="text-2xl font-bold text-gray-800">{filteredShops?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-eco-amber/10 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-eco-amber" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-800">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shop Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive map would be displayed here</p>
                <p className="text-sm text-gray-500">Integration with mapping service required</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shop List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops?.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>

        {filteredShops?.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No shops found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation,
  Coins,
  CheckCircle
} from "lucide-react";
import type { Shop } from "@shared/schema";

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const rating = 4.5 + Math.random() * 0.5; // Mock rating
  const distance = (Math.random() * 5 + 0.5).toFixed(1); // Mock distance
  const isOpen = shop.isActive && Math.random() > 0.2; // Mock open status

  return (
    <Card className="hover:shadow-lg transition-all transform hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2">
              {shop.name}
            </CardTitle>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-eco-amber text-eco-amber" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">(124 reviews)</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={isOpen ? "default" : "secondary"} className={isOpen ? "bg-eco-green" : ""}>
              {isOpen ? "Open" : "Closed"}
            </Badge>
            <div className="text-xs text-gray-500">
              {distance} km away
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 line-clamp-2">
              {shop.address}
            </p>
          </div>
          
          {shop.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{shop.phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {isOpen ? "Open until 9:00 PM" : "Opens at 9:00 AM"}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-eco-amber" />
            <span className="text-sm text-gray-600">
              {shop.pointsDistributed || 0} points distributed
            </span>
          </div>
          
          <div className="bg-eco-green/10 rounded-lg p-3 border border-eco-green/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-eco-green" />
              <span className="text-sm font-medium text-eco-green">
                Verified Partner
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Accepts all waste types • Point redemption available
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-gradient-eco-primary hover:opacity-90"
              disabled={!isOpen}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
            <Button 
              variant="outline"
              className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

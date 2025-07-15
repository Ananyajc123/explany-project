import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, Coins, User, Star } from "lucide-react";
import type { Book as BookType } from "@shared/schema";

interface BookCardProps {
  book: BookType;
}

export default function BookCard({ book }: BookCardProps) {
  const conditionColors = {
    excellent: "bg-eco-green text-white",
    good: "bg-eco-blue text-white",
    fair: "bg-eco-amber text-white"
  };

  const conditionColor = conditionColors[book.condition as keyof typeof conditionColors] || "bg-gray-500 text-white";

  return (
    <Card className="hover:shadow-lg transition-all transform hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            <Badge variant="outline" className="text-xs">
              {book.category}
            </Badge>
          </div>
          <div className="w-16 h-20 bg-eco-green/20 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
            <Book className="w-8 h-8 text-eco-green" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {book.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {book.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={conditionColor}>
                {book.condition}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-eco-amber text-eco-amber" />
                <span className="text-xs text-gray-600">4.5</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <User className="w-3 h-3" />
              <span>Seller #{book.sellerId}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 line-through">
                ₹{book.originalPrice}
              </div>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-eco-amber" />
                <span className="text-lg font-bold text-eco-amber">
                  {book.pointsPrice}
                </span>
                <span className="text-xs text-gray-600">points</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">You save</div>
              <div className="text-sm font-bold text-eco-green">
                ₹{(parseFloat(book.originalPrice) - (book.pointsPrice * 0.1)).toFixed(0)}
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-eco-primary hover:opacity-90"
            disabled={!book.isAvailable}
          >
            {book.isAvailable ? (
              <>
                <Coins className="w-4 h-4 mr-2" />
                Buy with Points
              </>
            ) : (
              'Sold Out'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

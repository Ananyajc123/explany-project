import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import BookCard from "@/components/book-card";
import { 
  Search, 
  Filter, 
  BookOpen,
  Plus,
  Star,
  TrendingUp,
  Users
} from "lucide-react";

export default function BookMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const { data: books } = useQuery({
    queryKey: ['/api/books'],
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Academic", label: "Academic" },
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Study Guides", label: "Study Guides" },
    { value: "Children", label: "Children" },
  ];

  const filteredBooks = books?.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesPriceRange = priceRange === "all" || 
                             (priceRange === "low" && book.pointsPrice <= 50) ||
                             (priceRange === "medium" && book.pointsPrice > 50 && book.pointsPrice <= 100) ||
                             (priceRange === "high" && book.pointsPrice > 100);
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  // Sample books for demo
  const sampleBooks = [
    {
      id: 1,
      title: "Mathematics for Class 10",
      author: "R.D. Sharma",
      category: "Academic",
      originalPrice: "450.00",
      pointsPrice: 90,
      condition: "good",
      description: "Complete mathematics textbook for class 10 students",
      imageUrl: null,
      sellerId: 1,
      isAvailable: true,
      createdAt: new Date()
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      originalPrice: "299.00",
      pointsPrice: 60,
      condition: "excellent",
      description: "Classic American novel in excellent condition",
      imageUrl: null,
      sellerId: 2,
      isAvailable: true,
      createdAt: new Date()
    },
    {
      id: 3,
      title: "Physics Study Guide",
      author: "HC Verma",
      category: "Study Guides",
      originalPrice: "650.00",
      pointsPrice: 130,
      condition: "good",
      description: "Comprehensive physics study guide with solved examples",
      imageUrl: null,
      sellerId: 1,
      isAvailable: true,
      createdAt: new Date()
    }
  ];

  const displayBooks = filteredBooks?.length ? filteredBooks : sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesPriceRange = priceRange === "all" || 
                             (priceRange === "low" && book.pointsPrice <= 50) ||
                             (priceRange === "medium" && book.pointsPrice > 50 && book.pointsPrice <= 100) ||
                             (priceRange === "high" && book.pointsPrice > 100);
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Book Marketplace
          </h1>
          <p className="text-gray-600">
            Buy and sell used books at half price using your earned points
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-eco-green/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-eco-green" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Books</p>
                  <p className="text-2xl font-bold text-gray-800">2,500+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-eco-blue/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-eco-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Sellers</p>
                  <p className="text-2xl font-bold text-gray-800">450</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-eco-amber/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-eco-amber" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Savings</p>
                  <p className="text-2xl font-bold text-gray-800">50%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Books</TabsTrigger>
            <TabsTrigger value="sell">Sell Your Books</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search books by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under 50 points</SelectItem>
                  <SelectItem value="medium">50-100 points</SelectItem>
                  <SelectItem value="high">Over 100 points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {displayBooks?.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No books found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or check back later
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sell" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Sell Your Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-eco-green/10 border border-eco-green/20 rounded-lg p-4">
                    <h3 className="font-semibold text-eco-green mb-2">How it works:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      <li>Take clear photos of your books</li>
                      <li>Set your price (we suggest 50% of original price)</li>
                      <li>List your books on the marketplace</li>
                      <li>Earn points when someone buys your book</li>
                    </ol>
                  </div>
                  
                  <Button className="w-full bg-gradient-eco-primary hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    List a Book
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    Coming soon: Easy book listing with automatic price suggestions
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Recycle, 
  Scan, 
  BarChart3, 
  MapPin, 
  Book, 
  Store 
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Scan Waste", href: "/scan", icon: Scan },
    { name: "Find Shops", href: "/shops", icon: MapPin },
    { name: "Books", href: "/books", icon: Book },
    { name: "Shop Panel", href: "/shop-dashboard", icon: Store },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-lg border-b-4 border-eco-green">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-eco-green to-eco-blue rounded-full flex items-center justify-center animate-pulse-slow">
              <Recycle className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold gradient-text">EXPLANY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={`text-gray-700 hover:text-eco-green transition-colors font-medium ${isActive("/") ? "text-eco-green" : ""}`}>
              Home
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-eco-green transition-colors font-medium flex items-center gap-1 ${
                  isActive(item.href) ? "text-eco-green" : ""
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-gray-700 hover:text-eco-green transition-colors font-medium ${
                  isActive("/") ? "text-eco-green" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-eco-green transition-colors font-medium flex items-center gap-2 ${
                    isActive(item.href) ? "text-eco-green" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
              <Link href="/dashboard">
                <Button className="w-full bg-gradient-to-r from-eco-green to-eco-blue text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

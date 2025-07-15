import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Smartphone, Download, Star } from "lucide-react";

export default function CtaSection() {
  const features = [
    { value: "100%", label: "Free to Use" },
    { value: "24/7", label: "Support Available" },
    { value: "5★", label: "User Rating" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-eco-green via-eco-blue to-eco-purple relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of rural communities already earning money while saving the environment
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/scan">
              <Button className="bg-white text-eco-green px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                <Smartphone className="w-5 h-5 mr-2" />
                Start Scanning Now
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-white text-eco-blue px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                <Download className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-white mb-2">{feature.value}</div>
                <div className="text-white/80">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

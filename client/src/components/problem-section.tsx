import { Card, CardContent } from "@/components/ui/card";
import { Flame, TreePine, DollarSign } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      title: "Burning Plastic",
      description: "Toxic fumes pollute air and harm health in rural communities",
      icon: Flame,
      color: "eco-red"
    },
    {
      title: "Forest Dumping",
      description: "Plastic waste destroys natural habitats and ecosystems",
      icon: TreePine,
      color: "eco-amber"
    },
    {
      title: "Lost Revenue",
      description: "Valuable recyclable materials are wasted instead of monetized",
      icon: DollarSign,
      color: "eco-purple"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-eco-red to-eco-amber bg-clip-text text-transparent">
              The Problem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rural areas lack proper waste management infrastructure, leading to environmental pollution and missed economic opportunities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all transform hover:scale-105">
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${
                  problem.color === 'eco-red' ? 'bg-eco-red' :
                  problem.color === 'eco-amber' ? 'bg-eco-amber' :
                  problem.color === 'eco-purple' ? 'bg-eco-purple' : 'bg-gray-500'
                } rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow`}>
                  <problem.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

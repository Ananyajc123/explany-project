import { Camera, Coins, Store, Truck } from "lucide-react";

export default function SolutionSection() {
  const solutions = [
    {
      title: "Scan & Categorize",
      description: "Use our AI-powered scanning to identify and categorize waste types instantly",
      icon: Camera,
      color: "eco-green"
    },
    {
      title: "Earn Points",
      description: "Get rewarded with points for every item you properly dispose of",
      icon: Coins,
      color: "eco-blue"
    },
    {
      title: "Redeem Locally",
      description: "Use points at partner shops in your community for goods and services",
      icon: Store,
      color: "eco-purple"
    },
    {
      title: "Collection & Recycling",
      description: "We collect waste from partner shops and send to recycling centers",
      icon: Truck,
      color: "eco-amber"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-eco-green/10 to-eco-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-eco-green to-eco-blue bg-clip-text text-transparent">
              Our Solution
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive mobile app that transforms waste management into a rewarding experience for rural communities.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Recycling plastic bottles" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-green/40 to-transparent"></div>
            </div>
          </div>
          
          <div className="space-y-8">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${
                  solution.color === 'eco-green' ? 'bg-eco-green' :
                  solution.color === 'eco-blue' ? 'bg-eco-blue' :
                  solution.color === 'eco-purple' ? 'bg-eco-purple' :
                  solution.color === 'eco-amber' ? 'bg-eco-amber' : 'bg-gray-500'
                } rounded-full flex items-center justify-center flex-shrink-0`}>
                  <solution.icon className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{solution.title}</h3>
                  <p className="text-gray-600">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

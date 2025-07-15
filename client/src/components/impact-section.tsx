import { Card, CardContent } from "@/components/ui/card";

export default function ImpactSection() {
  const impacts = [
    { value: "2.5M", label: "Plastic Items Recycled", color: "eco-green" },
    { value: "850", label: "Tons CO2 Saved", color: "eco-blue" },
    { value: "15K", label: "Active Users", color: "eco-purple" },
    { value: "₹4.2L", label: "Earned by Users", color: "eco-amber" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-eco-green/10 to-eco-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-eco-green to-eco-blue bg-clip-text text-transparent">
              Environmental Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making a real difference in rural communities and the environment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1569163139394-de4e4f43e4e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Environmental sustainability" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-green/40 to-transparent"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {impacts.map((impact, index) => (
              <Card key={index} className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className={`text-3xl font-black text-${impact.color} mb-2`}>
                    {impact.value}
                  </div>
                  <div className="text-gray-600 font-semibold">{impact.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

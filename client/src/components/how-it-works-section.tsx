import { ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Scan Waste",
      description: "Use the app to scan and categorize your plastic waste or e-waste",
      gradient: "from-eco-green to-eco-blue"
    },
    {
      number: "2",
      title: "Drop at Shop",
      description: "Take your waste to the nearest partner shop in your area",
      gradient: "from-eco-blue to-eco-purple"
    },
    {
      number: "3",
      title: "Earn Points",
      description: "Receive points instantly in your app wallet for verification",
      gradient: "from-eco-purple to-eco-amber"
    },
    {
      number: "4",
      title: "Redeem",
      description: "Use your points to buy products at partner shops or books",
      gradient: "from-eco-amber to-eco-red"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-eco-green to-eco-blue bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to transform your waste into rewards
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <span className="text-white font-black text-2xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-4 text-eco-green">
                  <ArrowRight className="w-6 h-6 animate-pulse-slow" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

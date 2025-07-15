import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import WasteScanner from "@/components/waste-scanner";
import { 
  Camera, 
  Scan, 
  CheckCircle, 
  AlertCircle,
  Coins,
  Weight,
  MapPin
} from "lucide-react";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: shops } = useQuery({
    queryKey: ['/api/shops'],
  });

  const { data: wasteCategories } = useQuery({
    queryKey: ['/api/waste-categories'],
  });

  const scanMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const response = await apiRequest('POST', '/api/scan-waste', { imageData });
      return response.json();
    },
    onSuccess: (data) => {
      setScanResult(data);
      toast({
        title: "Scan Successful!",
        description: `Detected: ${data.category.name} (${Math.round(data.confidence * 100)}% confidence)`,
      });
    },
    onError: () => {
      toast({
        title: "Scan Failed",
        description: "Unable to identify waste item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const submitWasteMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/waste-items', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Waste Item Submitted!",
        description: `You earned ${data.pointsEarned} points! Take it to the selected shop.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/waste-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      setScanResult(null);
      setSelectedShop(null);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Unable to submit waste item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleScan = (imageData: string) => {
    scanMutation.mutate(imageData);
  };

  const handleSubmit = () => {
    if (!scanResult || !selectedShop) return;

    const weight = 0.5; // Mock weight - would come from user input
    const pointsEarned = Math.round(scanResult.category.pointsPerKg * weight);

    submitWasteMutation.mutate({
      userId: 1, // Current user ID
      categoryId: scanResult.category.id,
      shopId: selectedShop.id,
      weight: weight.toString(),
      pointsEarned,
      status: "pending"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Scan Your Waste
          </h1>
          <p className="text-gray-600">
            Use AI to identify waste types and earn points
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Waste Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WasteScanner onScan={handleScan} isLoading={scanMutation.isPending} />
              </CardContent>
            </Card>

            {/* Scan Result */}
            {scanResult && (
              <Card className="border-eco-green">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-eco-green" />
                    Scan Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{scanResult.category.name}</span>
                      <Badge className="bg-eco-green">
                        {Math.round(scanResult.confidence * 100)}% confident
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-eco-amber" />
                      <span className="text-sm">
                        {scanResult.category.pointsPerKg} points per kg
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Suggestions:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scanResult.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Progress value={scanResult.confidence * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Shop Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Select Drop-off Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shops?.map((shop) => (
                    <div
                      key={shop.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedShop?.id === shop.id
                          ? 'border-eco-green bg-eco-green/10'
                          : 'border-gray-200 hover:border-eco-green/50'
                      }`}
                      onClick={() => setSelectedShop(shop)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{shop.name}</h3>
                          <p className="text-sm text-gray-600">{shop.address}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Coins className="w-3 h-3 text-eco-amber" />
                            <span className="text-xs text-gray-500">
                              {shop.pointsDistributed} points distributed
                            </span>
                          </div>
                        </div>
                        {selectedShop?.id === shop.id && (
                          <CheckCircle className="w-5 h-5 text-eco-green" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            {scanResult && selectedShop && (
              <Card className="bg-gradient-to-br from-eco-green/10 to-eco-blue/10 border-eco-green">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="w-5 h-5" />
                    Ready to Submit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Item:</span>
                          <p className="font-medium">{scanResult.category.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Shop:</span>
                          <p className="font-medium">{selectedShop.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Est. Weight:</span>
                          <p className="font-medium">0.5 kg</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Points:</span>
                          <p className="font-medium text-eco-amber">
                            {Math.round(scanResult.category.pointsPerKg * 0.5)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-gradient-eco-primary hover:opacity-90"
                      disabled={submitWasteMutation.isPending}
                    >
                      {submitWasteMutation.isPending ? 'Submitting...' : 'Submit Waste Item'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

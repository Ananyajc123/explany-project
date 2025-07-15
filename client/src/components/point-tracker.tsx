import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Target, Award } from "lucide-react";

interface PointTrackerProps {
  points: number;
}

export default function PointTracker({ points }: PointTrackerProps) {
  const nextMilestone = Math.ceil(points / 100) * 100;
  const progressToMilestone = ((points % 100) / 100) * 100;
  
  const milestones = [
    { points: 100, reward: "Eco Warrior", icon: Award, color: "eco-green" },
    { points: 500, reward: "Planet Protector", icon: Target, color: "eco-blue" },
    { points: 1000, reward: "Waste Champion", icon: TrendingUp, color: "eco-purple" },
    { points: 2000, reward: "Sustainability Hero", icon: Coins, color: "eco-amber" },
  ];

  const nextMilestoneReward = milestones.find(m => m.points > points);
  const unlockedMilestones = milestones.filter(m => m.points <= points);

  return (
    <Card className="bg-gradient-to-br from-eco-green/10 to-eco-blue/10 border-eco-green">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-eco-amber" />
          Point Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Points */}
          <div className="text-center">
            <div className="text-4xl font-black text-eco-green mb-2">
              {points}
            </div>
            <div className="text-gray-600">Total Points Earned</div>
          </div>

          {/* Progress to Next Milestone */}
          {nextMilestoneReward && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Next: {nextMilestoneReward.reward}
                </span>
                <span className="text-sm text-gray-600">
                  {points}/{nextMilestoneReward.points}
                </span>
              </div>
              <Progress 
                value={(points / nextMilestoneReward.points) * 100} 
                className="h-3"
              />
              <div className="text-xs text-gray-500 text-center">
                {nextMilestoneReward.points - points} points to go!
              </div>
            </div>
          )}

          {/* Unlocked Milestones */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Achievements Unlocked</h4>
            <div className="grid grid-cols-2 gap-3">
              {unlockedMilestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg bg-${milestone.color}/10 border border-${milestone.color}/20`}
                >
                  <div className="flex items-center gap-2">
                    <milestone.icon className={`w-4 h-4 text-${milestone.color}`} />
                    <div>
                      <div className="text-sm font-medium">{milestone.reward}</div>
                      <div className="text-xs text-gray-600">{milestone.points} pts</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points Value */}
          <div className="bg-white rounded-lg p-4 border border-eco-green/20">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Your Points Value</div>
              <div className="text-2xl font-bold text-eco-green">
                ₹{(points * 0.1).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                1 point = ₹0.10
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-white rounded-lg border border-eco-blue/20">
              <TrendingUp className="w-6 h-6 text-eco-blue mx-auto mb-1" />
              <div className="text-sm font-medium">Weekly Avg</div>
              <div className="text-lg font-bold text-eco-blue">+45</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-eco-purple/20">
              <Target className="w-6 h-6 text-eco-purple mx-auto mb-1" />
              <div className="text-sm font-medium">Monthly Goal</div>
              <div className="text-lg font-bold text-eco-purple">800</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

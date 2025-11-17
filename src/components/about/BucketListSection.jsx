import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Target, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function BucketListSection() {
  const { data: yearlyGoals, isLoading: goalsLoading } = useQuery({
    queryKey: ["yearlyGoals"],
    queryFn: () => base44.entities.YearlyGoal.list("-year"),
    initialData: [],
  });

  const { data: bucketList, isLoading: bucketLoading } = useQuery({
    queryKey: ["bucketList"],
    queryFn: () => base44.entities.BucketListItem.list(),
    initialData: [],
  });

  const currentYear = new Date().getFullYear();
  const thisYearGoals = yearlyGoals.filter(g => g.year === currentYear);

  return (
    <div className="space-y-8">
      {/* Yearly Goals */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-500" />
          {currentYear} Goals
        </h3>
        <div className="grid gap-4">
          {goalsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : thisYearGoals.length === 0 ? (
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-blue-900 font-medium mb-3">Default {currentYear} Goals:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Run 20-30 miles a week</li>
                <li>• Go on a trip with friends</li>
                <li>• Do 30 pushups and 6 pull ups</li>
                <li>• Launch a public app</li>
              </ul>
            </div>
          ) : (
            thisYearGoals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-gray-900">{goal.goal}</p>
                  {goal.completed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
                {goal.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Bucket List */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          Bucket List
        </h3>
        <div className="grid gap-3">
          {bucketLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : bucketList.length === 0 ? (
            <div className="bg-purple-50 rounded-xl p-6">
              <p className="text-purple-900 font-medium mb-3">Life Goals:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <Circle className="w-4 h-4 text-purple-500" />
                  Run a marathon
                </li>
                <li className="flex items-center gap-2">
                  <Circle className="w-4 h-4 text-purple-500" />
                  Climb Mount Everest
                </li>
                <li className="flex items-center gap-2">
                  <Circle className="w-4 h-4 text-purple-500" />
                  Write a book
                </li>
              </ul>
            </div>
          ) : (
            bucketList.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-3 p-4 rounded-xl ${
                  item.completed ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${item.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


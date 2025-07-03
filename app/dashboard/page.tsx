"use client";
import { RevenueChart } from "./components/revenue-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Activity, BarChart2 } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Users",
      icon: <Users className="h-6 w-6 text-primary" />,
      value: "12,450",
    },
    {
      title: "Monthly Revenue",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      value: "$18,320",
    },
    {
      title: "Active Sessions",
      icon: <Activity className="h-6 w-6 text-primary" />,
      value: "1,230",
    },
    {
      title: "Conversion Rate",
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      value: "5.3%",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart />
        </CardContent>
      </Card>
    </div>
  );
}

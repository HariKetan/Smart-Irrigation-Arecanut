// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
// import { AppSidebar } from "@/components/dashboard/app-sidebar";
// // import SectionCard from "@/components/dashboard/SectionCard";


// interface User {
//   email: string;
//   name?: string;
//   role?: string;
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch("/api/auth/me");
//         if (!response.ok) {
//           throw new Error("Authentication failed");
//         }
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         setError("Please log in to access the dashboard");
//         router.push("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, [router]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="destructive">
//         <AlertDescription>{error}</AlertDescription>
//       </Alert>
//     );
//   }


//   return (
//     <div>
//       <DashboardLayout>
        
//       </DashboardLayout>
//     </div>
//   );
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Droplets, Gauge, AlertTriangle, Power, MapPin, ChevronRight, Activity, Thermometer } from "lucide-react"

// Mock data for demonstration
const farmSections = [
  {
    id: 1,
    name: "Section A",
    crop: "Tomatoes",
    moisture: 45,
    threshold: 40,
    valveOpen: true,
    waterUsed: 1250,
    temperature: 24,
    lastWatered: "2 hours ago",
    flowRate: 15.2,
  },
  {
    id: 2,
    name: "Section B",
    crop: "Lettuce",
    moisture: 35,
    threshold: 50,
    valveOpen: false,
    waterUsed: 890,
    temperature: 22,
    lastWatered: "4 hours ago",
    flowRate: 0,
  },
  {
    id: 3,
    name: "Section C",
    crop: "Carrots",
    moisture: 60,
    threshold: 45,
    valveOpen: false,
    waterUsed: 1100,
    temperature: 26,
    lastWatered: "1 hour ago",
    flowRate: 0,
  },
  {
    id: 4,
    name: "Section D",
    crop: "Peppers",
    moisture: 30,
    threshold: 40,
    valveOpen: true,
    waterUsed: 950,
    temperature: 25,
    lastWatered: "30 min ago",
    flowRate: 12.8,
  },
]

interface DashboardProps {
  onSectionSelect: (sectionId: number) => void
}

export default function Dashboard({ onSectionSelect }: DashboardProps) {
  const [sections, setSections] = useState(farmSections)
  const [totalWaterUsed, setTotalWaterUsed] = useState(0)
  const [activeValves, setActiveValves] = useState(0)

  useEffect(() => {
    const total = sections.reduce((sum, section) => sum + section.waterUsed, 0)
    const active = sections.filter((section) => section.valveOpen).length
    setTotalWaterUsed(total)
    setActiveValves(active)
  }, [sections])

  const getMoistureStatus = (moisture: number, threshold: number) => {
    if (moisture < threshold - 10)
      return { status: "Critical", color: "destructive", bgColor: "bg-red-50 border-red-200" }
    if (moisture < threshold) return { status: "Low", color: "secondary", bgColor: "bg-orange-50 border-orange-200" }
    return { status: "Optimal", color: "default", bgColor: "bg-green-50 border-green-200" }
  }

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Smart Irrigation Control</h1>
          <p className="text-sm text-muted-foreground">Monitor and control your farm's irrigation system</p>
          <Badge variant="outline" className="flex items-center gap-1 w-fit mx-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            System Online
          </Badge>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">Total Water</span>
                <Droplets className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">{totalWaterUsed.toLocaleString()}L</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">Active Valves</span>
                <Power className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">
                {activeValves}/{sections.length}
              </div>
              <p className="text-xs text-muted-foreground">Irrigating</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">Avg Moisture</span>
                <Gauge className="h-4 w-4 text-orange-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">
                {Math.round(sections.reduce((sum, s) => sum + s.moisture, 0) / sections.length)}%
              </div>
              <p className="text-xs text-muted-foreground">All sections</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">Alerts</span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-lg md:text-2xl font-bold">
                {sections.filter((s) => s.moisture < s.threshold).length}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Cards */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold">Farm Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {sections.map((section) => {
              const moistureStatus = getMoistureStatus(section.moisture, section.threshold)
              return (
                <Card
                  key={section.id}
                  className={`${moistureStatus.bgColor} transition-all duration-200 cursor-pointer hover:shadow-md`}
                  onClick={() => onSectionSelect(section.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <CardTitle className="text-base md:text-lg">{section.name}</CardTitle>
                          <CardDescription className="text-sm">{section.crop}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={moistureStatus.color as any} className="text-xs">
                          {moistureStatus.status}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    {/* Moisture Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Soil Moisture</span>
                        <span className="font-bold">{section.moisture}%</span>
                      </div>
                      <Progress value={section.moisture} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Target: {section.threshold}% •{" "}
                        {section.moisture < section.threshold
                          ? `${section.threshold - section.moisture}% below target`
                          : "Above target"}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Thermometer className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">Temp</span>
                        </div>
                        <div className="text-sm font-medium">{section.temperature}°C</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Droplets className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">Used</span>
                        </div>
                        <div className="text-sm font-medium">{section.waterUsed}L</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Activity className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">Status</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${section.valveOpen ? "bg-green-500" : "bg-gray-400"}`}
                          ></div>
                          <span className="text-xs">{section.valveOpen ? "ON" : "OFF"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Alert if needed */}
                    {section.moisture < section.threshold && (
                      <div className="flex items-center gap-2 p-2 bg-orange-100 border border-orange-200 rounded-lg">
                        <AlertTriangle className="h-3 w-3 text-orange-600" />
                        <span className="text-xs text-orange-700">Needs immediate attention</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Activity className="h-4 w-4 mr-2" />
              System Status
            </Button>
            <Button variant="outline" className="h-12">
              <Droplets className="h-4 w-4 mr-2" />
              Water Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

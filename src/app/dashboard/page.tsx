"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Droplets, Gauge, AlertTriangle, Power, MapPin, ChevronRight, Activity, Thermometer, CheckCircle } from "lucide-react"
import SectionDetail from "@/components/dashboard/section-detail"
import { FARM_SECTIONS } from "@/lib/constants"
import { Section } from "@/types"
import { getMoistureStatus, calculateAverage, formatNumber } from "@/lib/utils"

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<"dashboard" | "section">("dashboard")
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  const [sections, setSections] = useState<Section[]>(FARM_SECTIONS)
  const [totalWaterUsed, setTotalWaterUsed] = useState(0)
  const [activeValves, setActiveValves] = useState(0)

  useEffect(() => {
    const total = sections.reduce((sum, section) => sum + section.waterUsed, 0)
    const active = sections.filter((section) => section.valveOpen).length
    setTotalWaterUsed(total)
    setActiveValves(active)
  }, [sections])

  const handleSectionSelect = (sectionId: number) => {
    setSelectedSection(sectionId)
    setCurrentView("section")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedSection(null)
  }

  if (currentView === "section" && selectedSection) {
    return <SectionDetail sectionId={selectedSection} onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-background  p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
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
              <div className="text-lg md:text-2xl font-bold">{formatNumber(totalWaterUsed)}L</div>
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
                {calculateAverage(sections.map(s => s.moisture))}%
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
                  className={`${moistureStatus.bgColor} transition-all duration-200 cursor-pointer hover:shadow-md dark:${moistureStatus.bgColor}`}
                  onClick={() => handleSectionSelect(section.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-black dark:text-black" />
                        <div>
                          <CardTitle className="text-base md:text-lg text-black dark:text-black">{section.name}</CardTitle>
                          <CardDescription className="text-sm text-black dark:text-black">{section.crop}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={moistureStatus.color as any} className="text-xs ">
                          {moistureStatus.status}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-black dark:text-black" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    {/* Moisture Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-black dark:text-black">
                        <span>Soil Moisture</span>
                        <span className="font-bold">{section.moisture}%</span>
                      </div>
                      <Progress value={section.moisture} className="h-2" />
                      <div className="text-xs text-muted-foreground dark:text-black">
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
                          <Thermometer className="h-3 w-3 text-orange-500 dark:text-orange-500" />
                          <span className="text-xs text-black dark:text-black">Temp</span>
                        </div>
                        <div className="text-sm font-medium text-black dark:text-black">{section.temperature}°C</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Droplets className="h-3 w-3 text-blue-500 dark:text-blue-500" />
                          <span className="text-xs text-black dark:text-black">Used</span>
                        </div>
                        <div className="text-sm font-medium text-black dark:text-black">{formatNumber(section.waterUsed)}L</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Activity className="h-3 w-3 text-green-500 dark:text-green-500" />
                          <span className="text-xs text-black dark:text-black">Status</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${section.valveOpen ? "bg-green-500 dark:bg-green-500" : "bg-gray-400 dark:bg-gray-400"}`}
                          ></div>
                          <span className="text-xs text-black dark:text-black">{section.valveOpen ? "ON" : "OFF"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Alert if needed */}
                    {/* {section.moisture < section.threshold && (
                      <div className="flex items-center gap-2 p-2 bg-orange-100 border border-orange-200 rounded-lg dark:bg-orange-100 dark:border-orange-200">
                        <AlertTriangle className="h-3 w-3 text-orange-600 dark:text-orange-600" />
                        <span className="text-xs text-orange-700 dark:text-orange-700">Needs immediate attention</span>
                      </div>
                    )} */}


                    {/* Status Alert */}
        {section.moisture < section.threshold ? (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-0">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium text-orange-800">Action Required</div>
                  <div className="text-sm text-orange-700">
                    Soil moisture is below the set threshold. Consider starting irrigation.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-0">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800">Optimal Conditions</div>
                  <div className="text-sm text-green-700">Soil moisture level is within the optimal range.</div>
                </div>
              </div>
            </CardContent>
          </Card>
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

import { Section } from "@/types"

export const FARM_SECTIONS: Section[] = [
  {
    id: 1,
    name: "Section A",
    crop: "Tomatoes",
    moisture: 45,
    threshold: 40,
    valveOpen: true,
    waterUsed: 1250,
    temperature: 24,
    humidity: 65,
    lastWatered: "2 hours ago",
    flowRate: 15.2,
    dailyUsage: [620, 150, 180, 145, 160, 140, 155],
    weeklyTarget: 1000,
    soilPh: 6.8,
    plantingDate: "2024-03-15",
    expectedHarvest: "2024-06-15",
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
    humidity: 70,
    lastWatered: "4 hours ago",
    flowRate: 0,
    dailyUsage: [80, 95, 110, 85, 90, 75, 85],
    weeklyTarget: 600,
    soilPh: 7.2,
    plantingDate: "2024-04-01",
    expectedHarvest: "2024-05-30",
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
    humidity: 60,
    lastWatered: "1 hour ago",
    flowRate: 0,
    dailyUsage: [100, 120, 140, 115, 125, 105, 120],
    weeklyTarget: 800,
    soilPh: 6.5,
    plantingDate: "2024-03-20",
    expectedHarvest: "2024-07-20",
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
    humidity: 68,
    lastWatered: "30 min ago",
    flowRate: 12.8,
    dailyUsage: [90, 110, 130, 105, 115, 95, 110],
    weeklyTarget: 750,
    soilPh: 6.9,
    plantingDate: "2024-03-25",
    expectedHarvest: "2024-07-25",
  },
]

export const MOISTURE_STATUS_THRESHOLDS = {
  CRITICAL: 10, // percentage points below threshold
  LOW: 0, // percentage points below threshold
}

export const MOISTURE_STATUS_STYLES = {
  CRITICAL: {
    status: "Critical",
    color: "destructive",
    bgColor: "bg-red-50 border-red-200",
  },
  LOW: {
    status: "Low",
    color: "secondary",
    bgColor: "bg-orange-50 border-orange-200",
  },
  OPTIMAL: {
    status: "Optimal",
    color: "default",
    bgColor: "bg-green-50 border-green-200",
  },
} as const 
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Square, Settings } from "lucide-react"
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export interface Section {
  id: string
  soil: string
  moisture: number
  requiredMoisture: number
  valveStatus: 'ON' | 'OFF'
  mode: 'AUTO' | 'MANUAL'
  flowRate: number
  lastIrrigation: string
}

interface SectionCardProps {
  section: Section
  onStart?: () => void
  onStop?: () => void
  onModeChange?: (mode: 'AUTO' | 'MANUAL') => void
}

export function SectionCard({ section, onStart, onStop, onModeChange }: SectionCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Section {section.id}</CardTitle>
        <span className="text-sm text-muted-foreground">{section.soil} Soil</span>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-center">
          <div className="w-24 h-24">
            <CircularProgressbar 
              value={section.moisture} 
              text={`${section.moisture}%`}
              styles={{
                path: { stroke: section.moisture < section.requiredMoisture ? '#ef4444' : '#22c55e' },
                text: { fill: section.moisture < section.requiredMoisture ? '#ef4444' : '#22c55e' }
              }}
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm">Required: {section.requiredMoisture}%</p>
            <p className="text-sm">
              Status:{' '}
              <span
                className={`font-medium ${section.moisture < section.requiredMoisture ? 'text-red-600' : 'text-green-600'}`}
              >
                {section.moisture < section.requiredMoisture ? '⚠️ Deficit' : '✅ OK'}
              </span>
            </p>
            <p className="text-sm">Valve: {section.valveStatus}</p>
            <p className="text-sm">Mode: {section.mode}</p>
            <p className="text-sm">Flow: {section.flowRate} L/min</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button 
            size="sm" 
            variant="default" 
            className="flex-1"
            onClick={onStart}
          >
            <Play className="mr-2 h-4 w-4" />
            Start
          </Button>
          <Button 
            size="sm" 
            variant="destructive" 
            className="flex-1"
            onClick={onStop}
          >
            <Square className="mr-2 h-4 w-4" />
            Stop
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onModeChange?.(section.mode === 'AUTO' ? 'MANUAL' : 'AUTO')}
          >
            <Settings className="mr-2 h-4 w-4" />
            {section.mode}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Last irrigated: {section.lastIrrigation}
        </p>
      </CardContent>
    </Card>
  )
} 
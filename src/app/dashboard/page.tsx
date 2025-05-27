"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Button } from "@/components/ui/button";
import { Play, Square, Settings } from "lucide-react";

// Define a more comprehensive user type
interface User {
  email: string;
  name?: string;
  role?: string;
}

interface Section {
  id: string;
  soil: string;
  moisture: number;
  requiredMoisture: number;
  valveStatus: 'ON' | 'OFF';
  mode: 'AUTO' | 'MANUAL';
  flowRate: number;
  lastIrrigation: string;
}

const sections: Section[] = [
  {
    id: 'A1',
    soil: 'Loamy',
    moisture: 23,
    requiredMoisture: 30,
    valveStatus: 'OFF',
    mode: 'AUTO',
    flowRate: 3.5,
    lastIrrigation: '2025-05-15 09:00 AM',
  },
  {
    id: 'A2',
    soil: 'Loamy',
    moisture: 10,
    requiredMoisture: 30,
    valveStatus: 'OFF',
    mode: 'AUTO',
    flowRate: 3.5,
    lastIrrigation: '2025-05-15 09:00 AM',
  },
  {
    id: 'A3',
    soil: 'Loamy',
    moisture: 10,
    requiredMoisture: 30,
    valveStatus: 'OFF',
    mode: 'AUTO',
    flowRate: 3.5,
    lastIrrigation: '2025-05-15 09:00 AM',
  },
  // Add more sections as needed
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError("Please log in to access the dashboard");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 ml-auto">
              <div className="text-sm text-muted-foreground">
                Welcome back, <span className="font-medium text-foreground">{user?.name || user?.email}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {sections.map((section) => (
              <Card key={section.id}>
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
                    <Button size="sm" variant="default" className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Start
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      <Square className="mr-2 h-4 w-4" />
                      Stop
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      {section.mode}
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Last irrigated: {section.lastIrrigation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 
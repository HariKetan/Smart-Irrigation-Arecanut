"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SectionCard, Section } from "@/components/dashboard/SectionCard";

interface User {
  email: string;
  name?: string;
  role?: string;
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

  const handleStart = (sectionId: string) => {
    // Implement start logic
    console.log('Start section:', sectionId);
  };

  const handleStop = (sectionId: string) => {
    // Implement stop logic
    console.log('Stop section:', sectionId);
  };

  const handleModeChange = (sectionId: string, mode: 'AUTO' | 'MANUAL') => {
    // Implement mode change logic
    console.log('Change mode:', sectionId, mode);
  };

  return (
    <DashboardLayout>
      {/* <DashboardHeader userName={user?.name} userEmail={user?.email} /> */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
        <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onStart={() => handleStart(section.id)}
              onStop={() => handleStop(section.id)}
              onModeChange={(mode) => handleModeChange(section.id, mode)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
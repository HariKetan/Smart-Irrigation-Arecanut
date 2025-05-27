"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </SidebarProvider>
  )
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-15 z-40 h-screen">
        <AppSidebar />
      </div>
      <div className={isCollapsed ? "flex-1 pl-16 transition-all duration-300" : "flex-1 pl-64 transition-all duration-300"}>
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </div>
  );
}
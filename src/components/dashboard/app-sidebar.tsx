"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart,
  LogOut,
} from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const { logout } = useAuth();

  return (
    <div
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        {/* <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className={cn("text-lg transition-opacity duration-300", isCollapsed ? "opacity-0" : "opacity-100")}>
            Dashboard
          </span>
        </Link> */}
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                  pathname === link.href && "bg-muted text-primary",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span>{link.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

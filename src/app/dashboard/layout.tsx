
import { DashboardNavbar } from "@/components/DashboardNavbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <main className=" w-full">
        <div className="flex flex-col h-screen">
          <DashboardNavbar />

          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  )
} 
import { Navbar } from "@/components/Navbar"
import { LandingPage } from "@/components/LandingPage"

export default function Home() {
  return(
    <div className="min-h-screen ">
      {/* <div style={{ backgroundColor: "red", height: "100px" }}></div> */}
      <Navbar />
      <LandingPage />
    </div>
  )
}

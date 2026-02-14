import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GreenStreakAuth from "./pages/GreenStreakAuth";
import GreenStreakDashboard from "./pages/GreenStreakDashboard";
import DailyChallenge from "./pages/DailyChallenge";
import VideoPage from "./pages/VideoPage";
import ImpactTracker from "./pages/ImpactTracker";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<GreenStreakAuth />} />
        <Route path="/dashboard" element={<GreenStreakDashboard />} />
        <Route path="/challenge" element={<DailyChallenge />} />
        <Route path="/impact" element={<ImpactTracker />} />

        
        
        {/* ✅ ADD IT HERE */}
        <Route path="/video/:id" element={<VideoPage />} />
        
      </Routes>
    </Router>
  );
}

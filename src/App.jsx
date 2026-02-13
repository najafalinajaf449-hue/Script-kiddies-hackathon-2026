<<<<<<< HEAD
import GreenStreakDashboard from "./pages/GreenStreakDashboard";

function App() {
  return <GreenStreakDashboard />;
=======
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GreenstreakAuth from "./pages/GreenstreakAuth";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<GreenstreakAuth />} />
      </Routes>
    </Router>
  );
>>>>>>> 47371c7ab732ffae7fd31577fedc36365a3a36e9
}

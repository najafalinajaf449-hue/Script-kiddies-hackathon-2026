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
}

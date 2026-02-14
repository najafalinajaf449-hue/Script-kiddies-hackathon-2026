import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ImpactTracker() {
  const navigate = useNavigate();

  const [plastic, setPlastic] = useState(0);
  const [co2, setCo2] = useState(0);
  const [trees, setTrees] = useState(0);
  const [water, setWater] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPlastic((prev) => (prev < 3.2 ? prev + 0.1 : prev));
      setCo2((prev) => (prev < 12 ? prev + 0.5 : prev));
      setTrees((prev) => (prev < 5 ? prev + 0.2 : prev));
      setWater((prev) => (prev < 40 ? prev + 1 : prev));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 font-display p-8">

     <div className="flex justify-between items-center mb-10">

  <button
    onClick={() => navigate("/dashboard")}
    className="text-primary font-semibold hover:underline"
  >
    ← Dashboard
  </button>

  <Link
    to="/"
    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all"
  >
    🏠 Home
  </Link>

</div>


      <h1 className="text-4xl font-bold mb-10">
        Your Environmental <span className="text-primary">Impact</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-lg text-slate-500">Plastic Saved</h2>
          <p className="text-3xl font-bold text-primary mt-4">
            {plastic.toFixed(1)} kg
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-lg text-slate-500">CO₂ Reduced</h2>
          <p className="text-3xl font-bold text-primary mt-4">
            {co2.toFixed(1)} kg
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-lg text-slate-500">Trees Equivalent</h2>
          <p className="text-3xl font-bold text-primary mt-4">
            {trees.toFixed(1)}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-lg text-slate-500">Water Saved</h2>
          <p className="text-3xl font-bold text-primary mt-4">
            {water.toFixed(0)} L
          </p>
        </div>

      </div>

      <div className="mt-16 bg-white p-10 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          How This Is Calculated
        </h2>
        <p className="text-slate-600">
          These metrics are calculated based on completed sustainability
          challenges. Each eco-friendly action contributes measurable
          environmental benefits such as reducing plastic usage,
          lowering carbon emissions, and conserving water.
        </p>
      </div>

    </div>
  );
}

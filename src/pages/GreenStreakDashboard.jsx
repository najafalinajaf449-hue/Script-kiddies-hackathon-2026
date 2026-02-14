import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function GreenStreakDashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [points, setPoints] = useState(0);

  // 🔐 Protect Route (Redirect if not logged in)
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate("/auth");
      return;
    }

    const fetchUser = async () => {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserName(userSnap.data().name);
        setPoints(userSnap.data().points);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;

  const daysInMonth = lastDay.getDate();
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

  const streakDays = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="min-h-screen font-display text-slate-800 bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white">
                eco
              </span>
            </div>
            <span className="text-xl font-bold">
              Green<span className="text-primary">Streak</span>
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">

            <Link
              to="/"
              className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:scale-105 transition-all"
            >
              🏠 Home
            </Link>

            <button
              onClick={() => navigate("/impact")}
              className="bg-white border border-primary text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:scale-105 transition-all"
            >
              📊 Impact
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://subjecttoclimate.org/teacher-guides/10-climate-change-games-for-the-classroom#Shopping",
                  "_blank"
                )
              }
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:scale-110 hover:shadow-primary/50 transition-all duration-300"
            >
              🎮 Game
            </button>

            {/* 🔥 NEW LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all"
            >
              🚪 Logout
            </button>

          </div>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-8 py-12 space-y-12 fade-up">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            Hello, {userName || "Eco Warrior"} 👋
          </h1>

          <p className="text-slate-500 mt-1">
            Ready for your next green act today?
          </p>

          <p className="text-primary font-bold mt-3 text-lg">
            Points: {points}
          </p>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ===== CHALLENGE CARD ===== */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-primary/20 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Today's Challenge</h2>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-md font-bold uppercase">
                Expires in 8h
              </span>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1602143407151-7111542de6e8"
                alt="Reusable bottle"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <h3 className="font-bold text-lg mb-2">
              Skip the Plastic
            </h3>

            <p className="text-slate-500 text-sm mb-4">
              Use a reusable container for your lunch today.
            </p>

            <p className="text-primary font-bold mb-6">
              +250 Points
            </p>

            <button
              onClick={() => navigate("/challenge")}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/50 transition-all duration-300"
            >
              Complete Task
            </button>
          </div>

          {/* ===== CALENDAR ===== */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-primary/10 shadow-md hover:shadow-xl transition-all duration-300">

            <div className="mb-8">
              <h2 className="text-xl font-bold">Streak Calendar</h2>
              <p className="text-sm text-slate-400">
                {today.toLocaleString("default", { month: "long" })} {currentYear}
              </p>
            </div>

            <div className="grid grid-cols-7 gap-y-6 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="text-xs font-bold text-slate-400 uppercase">
                  {d}
                </div>
              ))}

              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`prev-${i}`} className="text-slate-300 text-sm">
                  {prevMonthLastDay - startDay + i + 1}
                </div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate();
                const isStreak = streakDays.includes(day);

                return (
                  <div key={day} className="flex justify-center">
                    {isStreak ? (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                        ${
                          isToday
                            ? "bg-primary text-white pulse-glow"
                            : "bg-primary/10 border-2 border-primary text-primary hover:bg-primary hover:text-white"
                        }`}
                      >
                        {day}
                      </div>
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-full transition">
                        {day}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

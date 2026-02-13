import React from "react";

export default function GreenStreakDashboard() {
  // ===== REAL CALENDAR LOGIC =====
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
    <div className="bg-[#f6f8f6] min-h-screen font-['Spline_Sans'] text-slate-800">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white">eco</span>
            </div>
            <span className="text-xl font-bold">
              Green<span className="text-green-500">Streak</span>
            </span>
          </div>

          <div className="hidden md:flex gap-10 text-sm font-medium">
            <span className="text-green-500 border-b-2 border-green-500 pb-1">
              Dashboard
            </span>
            <span className="text-slate-500 hover:text-green-500">
              Challenges
            </span>
            <span className="text-slate-500 hover:text-green-500">
              Community
            </span>
            <span className="text-slate-500 hover:text-green-500">Impact</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="material-icons text-slate-400">notifications</span>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold">Alex Rivers</p>
                <p className="text-[10px] text-slate-400 uppercase">
                  Eco Warrior
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-200"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-8 py-10 space-y-10">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center">
          <div>
            <h1 className="text-3xl font-bold">Hello, Alex! 👋</h1>
            <p className="text-slate-500 mt-1">
              Ready for your next green act today?
            </p>
          </div>

          <div className="flex gap-5">
            <div className="bg-white px-6 py-4 rounded-xl border border-green-100 shadow-sm flex items-center gap-4 min-w-[180px]">
              <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="material-icons text-orange-500">
                  local_fire_department
                </span>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Streak</p>
                <p className="font-bold text-lg">5 Days</p>
              </div>
            </div>

            <div className="bg-white px-6 py-4 rounded-xl border border-green-100 shadow-sm flex items-center gap-4 min-w-[180px]">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                <span className="material-icons text-green-500">stars</span>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Total Points</p>
                <p className="font-bold text-lg">12,450</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LEVEL BAR ===== */}
        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                LEVEL 12
              </span>
              <span className="text-sm text-slate-500">Eco Guardian</span>
            </div>
            <span className="text-sm font-semibold">
              850 <span className="text-slate-400">/ 1000 XP to Level 13</span>
            </span>
          </div>

          <div className="w-full bg-slate-200 h-3 rounded-full">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: "85%" }}
            />
          </div>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== CHALLENGE CARD ===== */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border-2 border-green-500 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Today's Challenge</h2>
              <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-md font-bold uppercase text-slate-400">
                Expires in 8h
              </span>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1602143407151-7111542de6e8"
                alt="Reusable bottle"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-bold text-lg mb-2">Skip the Plastic</h3>

            <p className="text-slate-500 text-sm mb-4">
              Use a reusable container for your lunch today. Take a photo and
              share it with the community to earn your bonus points!
            </p>

            <p className="text-green-500 font-bold mb-6">+ 250 Points</p>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 transition">
              Complete Task
            </button>
          </div>

          {/* ===== CALENDAR ===== */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-green-100 shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-bold">Streak Calendar</h2>
              <p className="text-sm text-slate-400">
                {today.toLocaleString("default", { month: "long" })}{" "}
                {currentYear}
              </p>
            </div>

            <div className="grid grid-cols-7 gap-y-6 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div
                  key={d}
                  className="text-xs font-bold text-slate-400 uppercase"
                >
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
                  <div key={day} className="flex justify-center relative">
                    {isStreak ? (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                        ${
                          isToday
                            ? "bg-green-500 text-white"
                            : "bg-green-100 border-2 border-green-500 text-green-700"
                        }`}
                      >
                        {day}
                      </div>
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center text-sm font-medium text-slate-700">
                        {day}
                      </div>
                    )}

                    {isToday && (
                      <div className="absolute -bottom-1 w-1 h-1 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING BUTTON */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-green-500 w-16 h-16 rounded-full text-white text-3xl shadow-2xl hover:scale-105 transition">
          +
        </button>
      </div>
    </div>
  );
}

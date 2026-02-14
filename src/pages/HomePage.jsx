import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  


  return (
    
    <div
      className={`${
        darkMode ? "dark" : ""
      } bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display selection:bg-primary/30 transition-colors duration-500`}
    >
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 float-slow">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white font-bold">
                bolt
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Green<span className="text-primary">Streak</span>
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-primary/10 transition"
            >
              <span className="material-symbols-outlined">
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <Link
              to="/auth"
              className="px-6 py-2 text-sm font-semibold rounded-full hover:bg-primary/10 transition-all"
            >
              Login
            </Link>

          <button
  onClick={() => navigate("/auth")}
  className="px-6 py-2 bg-primary text-background-dark text-sm font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all"
>
  Get Started
</button>

          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-20">

        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20">

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight fade-up">
              Build Green Habits.{" "}
              <span className="text-primary">Earn Rewards.</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl fade-up">
              Join thousands of eco-warriors turning sustainable living into a
              rewarding daily challenge.
            </p>

            <div className="flex gap-4 fade-up">
  <button
  onClick={() => navigate("/auth")}
  className="px-8 py-4 bg-primary text-background-dark font-bold rounded-full shadow-lg shadow-primary/40 hover:scale-110 hover:shadow-primary/60 transition-all duration-300"
>
  Start Your Streak
</button>


              <button className="px-8 py-4 border border-slate-300 dark:border-slate-700 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* HERO VIDEOS */}
            <div className="mt-20 grid md:grid-cols-3 gap-10 fade-up">
              {[
                { id: 1, thumbnail: "https://img.youtube.com/vi/G9t__9Tmwv4/0.jpg" },
                { id: 2, thumbnail: "https://img.youtube.com/vi/jfsWI8XgQyo/0.jpg" },
                { id: 3, thumbnail: "https://img.youtube.com/vi/VfowJHJz6-s/0.jpg" },
              ].map((video) => (
                <Link
                  key={video.id}
                  to={`/video/${video.id}`}
                  className="group relative rounded-2xl overflow-hidden shadow-2xl hover:scale-110 hover:rotate-1 transition-all duration-500"
                >
                  <img
                    src={video.thumbnail}
                    alt="Video"
                    className="w-full h-60 object-cover group-hover:brightness-75 transition duration-500"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-6xl opacity-80 group-hover:scale-125 transition duration-300">
                      play_circle
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 fade-up">
            Turn Impact Into a <span className="text-primary">Habit</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "task_alt",
                title: "Daily Challenges",
                desc: "Small eco-friendly tasks that build long-term habits.",
              },
              {
                icon: "trending_up",
                title: "Track Your Streak",
                desc: "Stay motivated by maintaining your sustainability streak.",
              },
              {
                icon: "redeem",
                title: "Earn Rewards",
                desc: "Redeem points for real sustainable products.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-primary/10 bg-white dark:bg-background-dark/60 backdrop-blur-md hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 fade-up"
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-4">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center bg-primary text-background-dark">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Green Streak?
          </h2>
          <button className="px-10 py-4 bg-background-dark text-white font-bold rounded-full hover:scale-110 transition-all duration-300">
            Join Now
          </button>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center border-t border-primary/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 GreenStreak. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
}

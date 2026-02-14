import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display selection:bg-primary/30 transition-colors duration-300`}
    >
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white font-bold">
                bolt
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Green<span className="text-primary">Streak</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Leaderboard
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Community
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-primary/10 transition"
            >
              <span className="material-symbols-outlined">
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* LOGIN ROUTES TO AUTH PAGE */}
            <Link
              to="/auth"
              className="px-6 py-2 text-sm font-semibold rounded-full hover:bg-primary/10 transition-all"
            >
              Login
            </Link>

            <button className="px-6 py-2 bg-primary text-background-dark text-sm font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-20">

        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build Green Habits.{" "}
              <span className="text-primary">Earn Rewards.</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl">
              Join thousands of eco-warriors turning sustainable living into a
              rewarding daily challenge.
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-4 bg-primary text-background-dark font-bold rounded-full shadow-lg shadow-primary/30 hover:scale-105 transition-all">
                Start Your Streak
              </button>

              <button className="px-8 py-4 border border-slate-300 dark:border-slate-700 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
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
                className="p-8 rounded-xl border border-primary/10 bg-white dark:bg-background-dark/60 backdrop-blur-md hover:-translate-y-2 transition-all duration-300"
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
          <button className="px-10 py-4 bg-background-dark text-white font-bold rounded-full hover:scale-105 transition-all">
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

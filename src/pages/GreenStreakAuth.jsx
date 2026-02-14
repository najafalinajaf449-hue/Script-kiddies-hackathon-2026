import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GreenStreakAuth() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (
      email === "najafali449@gmail.com" &&
      password === "GREENSTREAK1122"
    ) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-display antialiased text-neutral-800 dark:text-neutral-100 overflow-hidden">

      {/* LEFT SIDE */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGt7EsJh7SohZBmHELNmoE-9tDN4FK_8B6-fUoil7WZmSWZWwm2bxRkCMWUFkmowIHu1wMgOgOX0NAS9Gx9Xr0TOQm9j7pEgWL-nvyHnhM2IovX4-bthIjZ53ygEb8lJevCQY9wATQ1_dNM4OFJ7ksciOVus_Nm_rIqEWrBf91qhormPndm1747E4tFqlXs-fsqMQafLtQA3K8MELuSW_0_-2MJBVBVFDEvhI21HSs4l_ofneANn-R4SneCtZoklxYTWKmZrJJ7ow"
          alt="Forest"
          className="absolute inset-0 w-full h-full object-cover float-slow"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 fade-in-up bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">

          <div>
            <h2 className="text-3xl font-bold mb-2">
              Login to <span className="text-primary">GreenStreak</span>
            </h2>
            <p className="text-neutral-500">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-full border border-slate-300 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-5 py-3 rounded-full border border-slate-300 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary transition"
                >
                  <span className="material-icons text-lg">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg animate-pulse">
                {error}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-primary/40 transition-all duration-300"
            >
              Login
            </button>

          </form>
        </div>
      </section>
    </main>
  );
}

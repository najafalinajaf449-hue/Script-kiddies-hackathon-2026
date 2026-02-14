import React, { useState } from "react";

export default function GreenStreakAuth() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen bg-background-light dark:bg-background-dark font-display antialiased text-neutral-800 dark:text-neutral-100 overflow-hidden">
      
      {/* LEFT SIDE */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-eco-800">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGt7EsJh7SohZBmHELNmoE-9tDN4FK_8B6-fUoil7WZmSWZWwm2bxRkCMWUFkmowIHu1wMgOgOX0NAS9Gx9Xr0TOQm9j7pEgWL-nvyHnhM2IovX4-bthIjZ53ygEb8lJevCQY9wATQ1_dNM4OFJ7ksciOVus_Nm_rIqEWrBf91qhormPndm1747E4tFqlXs-fsqMQafLtQA3K8MELuSW_0_-2MJBVBVFDEvhI21HSs4l_ofneANn-R4SneCtZoklxYTWKmZrJJ7ow"
          alt="Lush misty green forest"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 w-full flex flex-col justify-between p-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="material-icons text-background-dark">
                trending_up
              </span>
            </div>
            <span className="text-2xl font-bold text-white">
              GreenStreak
            </span>
          </div>

          {/* Hero Text */}
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Small habits, <br />
              <span className="text-primary">massive impact.</span>
            </h1>
            <p className="text-lg text-neutral-100/80">
              Join 50,000+ eco-warriors gamifying their journey toward a sustainable lifestyle.
            </p>
          </div>

          {/* Testimonial */}
          <div className="glass-panel rounded-xl p-6 max-w-sm">
            <p className="text-sm text-white italic">
              "GreenStreak helped me reduce my plastic waste by 40% in just three months."
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Create your account
            </h2>
            <p className="text-neutral-500">
              Start your sustainability streak today.
            </p>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHJ8ecNd4e1XoRhO1OxEMZUVyikIegFwTlHyAwmlHN0iq4eiNCisw2JClQCVYw4rMAX8NSjAEo0c4iJEPKTyu211W2FqmecFD62_fTARQa0uWe34RB6GSI0-F9IBertHDEuESA69HrFeSF9ZRxcnTaBlqVs2TCwVfTcipjWdnP3lJ2AKtGiHo8l6tN1tcXDgWQrpxd3Jz0gENAzyDbbjPWUAiVlAZAIORL2i8FPMlz_BzcTxln1PU5amamGFNnooSoOUSw_SdAIUY"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t" />
            <span className="mx-4 text-xs uppercase tracking-widest text-neutral-400">
              Or with email
            </span>
            <div className="flex-grow border-t" />
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                >
                  <span className="material-icons text-lg">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-primary" />
              <span className="text-xs text-neutral-500">
                I agree to the Terms and Privacy Policy.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-neutral-eco-800 dark:bg-primary text-white dark:text-neutral-900 font-bold rounded-full hover:scale-[1.02] transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <a href="#" className="font-bold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

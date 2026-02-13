import React from "react";

export default function Auth() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-neutral-800 dark:text-neutral-100 min-h-screen">
      <main className="flex min-h-screen">

        {/* LEFT SIDE */}
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-eco-800">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGt7EsJh7SohZBmHELNmoE-9tDN4FK_8B6-fUoil7WZmSWZWwm2bxRkCMWUFkmowIHu1wMgOgOX0NAS9Gx9Xr0TOQm9j7pEgWL-nvyHnhM2IovX4-bthIjZ53ygEb8lJevCQY9wATQ1_dNM4OFJ7ksciOVus_Nm_rIqEWrBf91qhormPndm1747E4tFqlXs-fsqMQafLtQA3K8MELuSW_0_-2MJBVBVFDEvhI21HSs4l_ofneANn-R4SneCtZoklxYTWKmZrJJ7ow"
            alt="Green forest"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
          />

          <div className="relative z-10 w-full flex flex-col justify-between p-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="material-icons text-background-dark">
                  trending_up
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                GreenStreak
              </span>
            </div>

            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                Small habits,
                <br />
                <span className="text-primary">massive impact.</span>
              </h1>
              <p className="text-lg text-neutral-100/80 leading-relaxed">
                Join 50,000+ eco-warriors gamifying their journey toward a
                sustainable, carbon-neutral lifestyle.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background-light dark:bg-background-dark">
          <div className="w-full max-w-md space-y-8">

            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold dark:text-white mb-2">
                Create your account
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400">
                Start your sustainability streak today.
              </p>
            </div>

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-neutral-200 dark:border-neutral-800 rounded-full bg-white dark:bg-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200">
              <span className="font-medium">Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
              <span className="mx-4 text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Or with email
              </span>
              <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
            </div>

            {/* Form */}
            <form className="space-y-5">

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium ml-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium ml-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium ml-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200"
                />
              </div>

              <div className="flex items-center space-x-2 ml-1">
                <input
                  id="terms"
                  type="checkbox"
                  className="rounded text-primary h-4 w-4"
                />
                <label htmlFor="terms" className="text-xs text-neutral-500">
                  I agree to the Terms and Privacy Policy.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-neutral-eco-800 dark:bg-primary text-white dark:text-neutral-900 font-bold rounded-full hover:scale-[1.02] transition-all duration-200"
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
    </div>
  );
}

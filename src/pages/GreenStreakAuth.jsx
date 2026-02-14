import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function GreenStreakAuth() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      // If user does not exist → create
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: fullName,
          email: email,
          points: 1000,
          streak: 1,
          createdAt: new Date()
        });
      }

      // 🔥 SAVE SESSION
      localStorage.setItem("userEmail", email);

      // 🔥 NAVIGATE
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <main className="flex min-h-screen bg-background-light dark:bg-background-dark font-display antialiased text-neutral-800 dark:text-neutral-100 overflow-hidden">

      {/* LEFT SIDE */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-eco-800">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGt7EsJh7SohZBmHELNmoE-9tDN4FK_8B6-fUoil7WZmSWZWwm2bxRkCMWUFkmowIHu1wMgOgOX0NAS9Gx9Xr0TOQm9j7pEgWL-nvyHnhM2IovX4-bthIjZ53ygEb8lJevCQY9wATQ1_dNM4OFJ7ksciOVus_Nm_rIqEWrBf91qhormPndm1747E4tFqlXs-fsqMQafLtQA3K8MELuSW_0_-2MJBVBVFDEvhI21HSs4l_ofneANn-R4SneCtZoklxYTWKmZrJJ7ow"
          alt="Forest"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          <div>
            <h2 className="text-3xl font-bold mb-2">
              Create your account
            </h2>
            <p className="text-neutral-500">
              Start your sustainability streak today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-full hover:scale-[1.02] transition"
            >
              Create Account
            </button>
          </form>

        </div>
      </section>
    </main>
  );
}

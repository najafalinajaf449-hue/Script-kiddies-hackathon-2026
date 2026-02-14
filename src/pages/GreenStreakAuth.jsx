import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function GreenStreakAuth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !fullName)) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (isLogin) {
        // 🔵 LOGIN
        if (!userSnap.exists()) {
          setError("Account not found.");
          return;
        }

        if (userSnap.data().password !== password) {
          setError("Incorrect password.");
          return;
        }

      } else {
        // 🟢 SIGNUP
        if (userSnap.exists()) {
          setError("Account already exists. Please login.");
          return;
        }

        await setDoc(userRef, {
          name: fullName,
          email,
          password,
          points: 1000,
          streak: 0,
          lastCompletedDate: null,
          createdAt: new Date()
        });
      }

      // ✅ Save session
      localStorage.setItem("userEmail", email);

      // ✅ Go to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <main className="flex min-h-screen bg-background-light font-display text-neutral-800">
      <section className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          <div>
            <h2 className="text-3xl font-bold mb-2">
              {isLogin ? "Login to GreenStreak" : "Create Account"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-5 py-3 rounded-full border outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full border outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full border outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-full"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-primary font-bold"
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </p>

        </div>
      </section>
    </main>
  );
}

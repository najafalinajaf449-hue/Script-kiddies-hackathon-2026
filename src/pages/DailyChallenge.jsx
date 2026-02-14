import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, getDoc, increment } from "firebase/firestore";

export default function DailyChallenge() {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!uploaded) {
      alert("Please upload proof first.");
      return;
    }

    try {
      setLoading(true);

      const email = localStorage.getItem("userEmail");

      if (!email) {
        alert("You are not logged in.");
        navigate("/auth");
        return;
      }

      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("User not found.");
        setLoading(false);
        return;
      }

      const today = new Date().toDateString();
      const lastCompleted = userSnap.data().lastCompletedDate;

      // 🚫 Prevent completing twice same day
      if (lastCompleted === today) {
        alert("You already completed today's challenge!");
        setLoading(false);
        return;
      }

      // 🔥 Update Firestore
      await updateDoc(userRef, {
        points: increment(500),
        streak: increment(1),
        lastCompletedDate: today
      });

      alert("🎉 Challenge Completed! +500 Points");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100 font-display selection:bg-primary/30">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-primary/10 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg shadow-md">
            <span className="material-symbols-outlined text-background-dark">
              eco
            </span>
          </div>
          <h1 className="text-xl font-bold">
            Green<span className="text-primary">Streak</span>
          </h1>
        </div>

        <Link
          to="/"
          className="text-slate-500 hover:text-primary font-semibold"
        >
          Home
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-12">

        {/* CHALLENGE CARD */}
        <section className="bg-white/80 backdrop-blur-lg border border-primary/10 rounded-3xl p-10 shadow-xl">

          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
            Daily Challenge
          </span>

          <h2 className="text-4xl font-bold mb-4">
            Zero Waste <span className="text-primary">Lunch</span>
          </h2>

          <p className="text-slate-600 max-w-xl mb-8">
            Prepare a meal using reusable containers and locally sourced
            ingredients with zero packaging waste.
          </p>

          <div className="flex items-center gap-12">
            <div>
              <p className="text-xs text-slate-400 uppercase">Reward</p>
              <p className="text-2xl font-bold text-primary">
                +500 Points
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase">Difficulty</p>
              <p className="font-semibold">Expert Tier</p>
            </div>
          </div>
        </section>

        {/* UPLOAD SECTION */}
        <section className="bg-white/80 backdrop-blur-lg border border-primary/10 rounded-3xl p-10 shadow-xl space-y-8">

          <h3 className="text-xl font-bold">
            📸 Proof of Impact
          </h3>

          <div
            onClick={() => setUploaded(true)}
            className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all ${
              uploaded
                ? "border-primary bg-primary/5"
                : "border-primary/20 hover:border-primary hover:bg-primary/5"
            }`}
          >
            {uploaded ? (
              <p className="text-primary font-semibold text-lg">
                ✔ Photo Uploaded Successfully
              </p>
            ) : (
              <>
                <p className="text-slate-500 text-lg">
                  Click to upload proof
                </p>
                <p className="text-xs text-slate-400 mt-3">
                  (JPEG / PNG)
                </p>
              </>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            {loading ? "Submitting..." : "Submit Challenge"}
          </button>

        </section>

      </main>
    </div>
  );
}

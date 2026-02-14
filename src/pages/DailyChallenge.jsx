import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DailyChallenge() {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!uploaded) {
      alert("Please upload proof first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert("🎉 Congratulations! +500 Points Earned!");
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100 font-display selection:bg-primary/30">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
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

        <span className="text-sm font-semibold text-primary">
          Expert Tier III
        </span>
        <Link
  to="/"
  className="text-slate-500 hover:text-primary font-semibold"
>
  Home
</Link>

      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-12 fade-in-up">

        {/* DAILY CHALLENGE HEADER */}
        <section className="bg-white/80 dark:bg-background-dark/60 backdrop-blur-lg border border-primary/10 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">

          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
            Daily Challenge
          </span>

          <h2 className="text-4xl font-bold mb-4">
            Zero Waste <span className="text-primary">Lunch</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-xl mb-8">
            Prepare a meal using reusable containers and locally sourced
            ingredients with zero packaging waste.
          </p>

          <div className="flex items-center gap-12">
            <div>
              <p className="text-xs text-slate-400 uppercase">
                Reward
              </p>
              <p className="text-2xl font-bold text-primary">
                +500 Points
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase">
                Difficulty
              </p>
              <p className="font-semibold">
                Expert Tier
              </p>
            </div>
          </div>
        </section>

        {/* EVIDENCE UPLOAD */}
        <section className="bg-white/80 dark:bg-background-dark/60 backdrop-blur-lg border border-primary/10 rounded-3xl p-10 shadow-xl space-y-8 hover:shadow-2xl transition-all duration-300">

          <h3 className="text-xl font-bold flex items-center gap-2">
            📸 Proof of Impact
          </h3>

          <div
            onClick={() => setUploaded(true)}
            className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all duration-300 ${
              uploaded
                ? "border-primary bg-primary/5 pulse-soft"
                : "border-primary/20 hover:border-primary hover:bg-primary/5"
            }`}
          >
            {uploaded ? (
              <div className="space-y-2">
                <p className="text-primary font-semibold text-lg">
                  ✔ Photo Uploaded Successfully
                </p>
                <p className="text-sm text-slate-500">
                  Your eco-impact has been recorded.
                </p>
              </div>
            ) : (
              <>
                <p className="text-slate-500 text-lg">
                  Drag & drop evidence photo here
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
            className="w-full py-4 bg-primary text-background-dark font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined">
                  progress_activity
                </span>
                Submitting...
              </>
            ) : (
              "Submit Challenge"
            )}
          </button>

        </section>

      </main>
    </div>
  );
}

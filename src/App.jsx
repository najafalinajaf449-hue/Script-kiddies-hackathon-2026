import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex flex-col items-center justify-center text-white">
      
      <h1 className="text-4xl font-bold mb-6">
        🚀 MyApp is not  Working!
      </h1>

      <div className="bg-white text-black p-6 rounded-xl shadow-xl text-center">
        <p className="text-xl mb-4">Counter: {count}</p>

        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
        >
          Increase
        </button>
      </div>

    </div>
  );
}

export default App;

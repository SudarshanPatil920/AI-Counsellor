import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Universities() {
  const [unis, setUnis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await api("/universities/recommendations");

        if (Array.isArray(data) && data.length > 0) {
          setUnis(data);
        } else {
          setError("No university recommendations available yet.");
        }
      } catch (err) {
        setError("Failed to load university recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const lockUniversity = async (uni) => {
    try {
      await api("/decision/lock", "POST", {
        country: uni.country || "Unknown",
        university: uni.name,
      });

      // Move user to next stage
      localStorage.setItem("page", "dashboard");
      window.location.reload();
    } catch (err) {
      alert("Unable to lock university. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          University Recommendations
        </h2>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-600">Loading universities...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {/* University List */}
      {!loading && !error && unis.length > 0 && (
        <div className="space-y-4">
          {unis.map((u) => (
            <div
              key={u.id}
              className="border rounded p-4 shadow-sm"
            >
              <p className="font-semibold text-lg">
                {u.name}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Category: <strong>{u.category}</strong>
              </p>

              <p className="text-sm mt-2">
                {u.reason}
              </p>

              <button
                onClick={() => lockUniversity(u)}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Lock University & Continue
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


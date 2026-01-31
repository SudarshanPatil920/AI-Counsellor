import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Dashboard() {
  const [stage, setStage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStage = async () => {
    try {
      const res = await api("/profile/stage");
      setStage(res.stage);

      // Load tasks ONLY in application stage
      if (res.stage === "PREPARING_APPLICATIONS") {
        const t = await api("/tasks");
        setTasks(Array.isArray(t) ? t : []);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("Failed to fetch stage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStage();
  }, []);

  const completedCount = tasks.filter(t => t.completed).length;

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Stage: {stage}
        </h2>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* BUILDING PROFILE */}
      {stage === "BUILDING_PROFILE" && (
        <p className="text-gray-600">
          Complete onboarding to unlock university recommendations.
        </p>
      )}

      {/* DISCOVERING UNIVERSITIES */}
      {stage === "DISCOVERING_UNIVERSITIES" && (
        <div>
          <p className="mb-4 text-gray-600">
            View AI-recommended universities and lock one to proceed.
          </p>

          <button
            onClick={() => {
              localStorage.setItem("page", "universities");
              window.location.reload();
            }}
            className="bg-black text-white px-4 py-2"
          >
            View University Recommendations
          </button>
        </div>
      )}

      {/* PREPARING APPLICATIONS */}
      {stage === "PREPARING_APPLICATIONS" && (
        <>
          <p className="mb-4 text-gray-600">
            Progress: {completedCount} / {tasks.length} tasks completed
          </p>

          {tasks.length === 0 && (
            <p className="text-gray-500">
              No tasks available yet.
            </p>
          )}

          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 border p-3 rounded mb-2"
            >
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
              />
              <span className={task.completed ? "line-through text-gray-500" : ""}>
                {task.title}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

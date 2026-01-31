import { api } from "../api/api";

export default function Onboarding() {
  const submit = async () => {
    await api("/profile", "POST", {
      education: "B.Tech",
      major: "Computer Science",
      gpa: 7.8,
      budget: 35000,
      ielts: "Completed",
      gre: "Not Started",
      sop: "Draft",
    });

    localStorage.setItem("page", "dashboard");
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Complete Onboarding</h2>
      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Submit Profile
      </button>
    </div>
  );
}

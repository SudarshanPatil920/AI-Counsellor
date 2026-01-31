import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Counsellor from "./pages/Counsellor";
import Universities from "./pages/Universities";

export default function App() {
  const page = localStorage.getItem("page") || "auth";

  if (page === "onboarding") return <Onboarding />;
  if (page === "dashboard") return <Dashboard />;
  if (page === "counsellor") return <Counsellor />;
  if (page === "universities") return <Universities />;

  return <Auth />;
}

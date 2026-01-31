import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Counsellor() {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        api("/counsellor/chat", "POST").then(res => setMsg(res.message));
    }, []);

    return (
        <div className="p-6">
            <h2 className="font-bold">AI Counsellor</h2>
            <p className="mt-4">{msg}</p>

            <button
                onClick={async () => {
                    await api("/decision/lock", "POST", {
                        country: "Germany",
                        university: "TU Munich"
                    });

                    localStorage.setItem("page", "dashboard");
                    window.location.reload();
                }}
                className="mt-4 bg-black text-white px-4 py-2"
            >
                Lock University & Continue
            </button>

        </div>
    );
}

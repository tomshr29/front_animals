import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug log
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3333/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Chargement...</p>;

  if (!user) {
    return (
      <div className="p-4">
        <h1 className="text-xl">Bienvenue 👋</h1>
        <p className="mt-2">Tu n’es pas connecté.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl">Bienvenue 👋</h1>
      <p className="mt-2">Ton email : {user.email}</p>
    </div>
  );
}

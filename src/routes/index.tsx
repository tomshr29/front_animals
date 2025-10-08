import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("Chargement...");
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3333";

  useEffect(() => {
    fetch(`${apiUrl}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) setMessage(data.message);
        else setMessage("Aucun message trouvé");
      })
      .catch(() => setMessage("Erreur : impossible de contacter le serveur"));
  }, [apiUrl]);


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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🏡 Accueil</h1>
      <p className="mt-2 text-gray-700">{message}</p>

      {!user ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Bienvenue 👋</h2>
          <p className="mt-2 text-gray-600">Tu n’es pas connecté.</p>
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Bienvenue 👋</h2>
          <p className="mt-2 text-gray-600">Ton email : {user.email}</p>
        </div>
      )}
    </div>
  );
}
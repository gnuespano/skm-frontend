import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("carregando...");
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStatus() {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/status"
        );

        if (!res.ok) throw new Error("Backend offline");

        const data = await res.json();

        setStatus(data.status);
        setTimestamp(data.timestamp);
      } catch (err) {
        console.error(err);
        setError("Erro ao conectar com o backend");
        setStatus("offline");
      }
    }

    loadStatus();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>SKM — Painel Online</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <>
          <p>Status: <b>{status}</b></p>
          {timestamp && <p>Timestamp: {timestamp}</p>}
        </>
      )}
    </div>
  );
}

export default App;

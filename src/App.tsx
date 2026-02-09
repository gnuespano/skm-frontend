import { useEffect, useState } from "react";

type StatusResponse = {
  status: string;
  timestamp: string;
};

function App() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatus() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/status`
        );

        if (!res.ok) {
          throw new Error("Backend não respondeu");
        }

        const data: StatusResponse = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("Erro ao conectar com o backend", err);
        setError("Backend offline");
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>SKM — Painel Local</h1>

      {loading && <p>Carregando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {status && !error && (
        <div>
          <p>
            Status: <b>{status.status}</b>
          </p>
          <p>Timestamp: {status.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/status`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend não respondeu");
        return res.json();
      })
      .then((data) => setStatus(data))
      .catch(() => setError("Erro ao conectar com o backend"));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>SKM — Painel Local</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {status ? (
        <div>
          <p>Status: <b>{status.status}</b></p>
          <p>Timestamp: {status.timestamp}</p>
        </div>
      ) : (
        !error && <p>Carregando...</p>
      )}
    </div>
  );
}

export default App;

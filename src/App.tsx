import { useEffect, useState } from 'react';

type StatusResponse = {
  status: string;
  service: string;
  env: string;
  timestamp: string;
};

function App() {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://skm-backend-production.up.railway.app/status')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao conectar com backend');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: 40 }}>
      <h1>SKM — Painel Local</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data ? (
        <div>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Service:</strong> {data.service}</p>
          <p><strong>Environment:</strong> {data.env}</p>
          <p><strong>Timestamp:</strong> {data.timestamp}</p>
        </div>
      ) : (
        !error && <p>Conectando ao backend...</p>
      )}
    </div>
  );
}

export default App;

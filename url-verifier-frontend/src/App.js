import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!url) {
      setError("Please enter a URL!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:3000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>URL Verification Tool</h1>
      <input
        type="text"
        value={url}
        placeholder="Enter URL here"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleVerify}>Verify URL</button>

      {loading && <p>Checking URL...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p>
            Status:{" "}
            <span
              style={{
                color: result.isMalicious ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {result.isMalicious ? "Malicious" : "Safe"}
            </span>
          </p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Amplify, { API } from "aws-amplify";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState("get");

  async function test(e) {
    e.preventDefault();

    setLoading(true);
    setResponse(null);
    setError(null);

    Amplify.configure({
      API: {
        endpoints: [
          {
            name: "Default",
            endpoint: "",
            // custom_header: async () => ({
            //   Authorization: `Bearer ${bearer}`,
            // }),
          },
        ],
      },
    });

    await API[method]("Default", url)
      .then((response) => {
        setResponse(JSON.stringify(response, null, 2));
        setLoading(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error, null, 2));
        setLoading(false);
      });
  }

  return (
    <form className="App">
      <div>
        <p className="form">
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="post">POST</option>
            <option value="get">GET</option>
            <option value="put">PUT</option>
            <option value="delete">DELETE</option>
          </select>
          <input
            type=""
            value={url}
            placeholder="https://api.github.com/users/gusribeiro"
            onChange={(e) => setUrl(e.target.value)}
            readOnly={loading}
          />
        </p>
        {/* <p>
          <textarea
            value={bearer}
            onChange={(e) => setBearer(e.target.value)}
          ></textarea>
        </p> */}
        <button type="button" onClick={(e) => test(e)} disabled={loading}>
          enviar
        </button>
      </div>
      <pre>{error || response}</pre>
    </form>
  );
}

export default App;

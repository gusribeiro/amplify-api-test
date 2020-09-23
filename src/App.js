import React, { useState } from "react";
import Amplify, { API } from "aws-amplify";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  // const [bearer, setBearer] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

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

    console.log(url);
    await API.get("Default", url)
      .then((response) => {
        setResponse(JSON.stringify(response, null, 2));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  return (
    <form className="App">
      <div>
        <p>
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

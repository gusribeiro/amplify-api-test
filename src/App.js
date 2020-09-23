import React, { useState } from "react";
import Amplify, { API } from "aws-amplify";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [bearer, setBearer] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  async function test(e) {
    e.preventDefault();

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
      .then((response) => setResponse(JSON.stringify(response, null, 2)))
      .catch((error) => setError(error.message));
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
          />
        </p>
        {/* <p>
          <textarea
            value={bearer}
            onChange={(e) => setBearer(e.target.value)}
          ></textarea>
        </p> */}
        <button type="button" onClick={(e) => test(e)}>
          enviar
        </button>
      </div>
      <pre>{error || response}</pre>
    </form>
  );
}

export default App;

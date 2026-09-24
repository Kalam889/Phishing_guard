// import "./App.css"
// import { useState } from "react";
// function App() {
//   const [url, setUrl] = useState("");
//   const [result, setResult] = useState("");
//   const [risk, setRisk] = useState(0);
//   function checkUrl() {
//       // alert("clicked");
//       fetch("https://phishing-guard-cpim.onrender.com/url",{
//       method: "POST",
//       headers: {"Content-Type":"application/json"},
//       body:JSON.stringify({url:url})  
//     })
//     .then(res => res.json())
//     .then(data => {
//         setResult(data.result);
//         setRisk(data.risk);
//     })
//    .catch(err => {
//       console.log("ERROR:", err);
//     });  
//   }
//   return (
//     <div>
//       <input type="text" value={url} placeholder="Enter your url" onChange={(e) => setUrl(e.target.value)} /> <br/>
//       <button onClick={checkUrl}>Check</button>

//       <h2>Result: {result}</h2>
//       <p>Risk Score: {risk}</p>
//     </div>
//   )
// }
// export default App;
import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [risk, setRisk] = useState(0);

  function checkUrl() {
    fetch("https://phishing-guard-cpim.onrender.com/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.result);
        setRisk(data.risk);
      })
      .catch((err) => console.log(err));
  }

  const riskClass =
    risk < 35 ? "safe" : risk < 70 ? "warning" : "danger";

  const barClass =
    risk < 35 ? "green" : risk < 70 ? "yellow" : "red";

  return (
    <div className="app">
      <div className="card">
        <div className="icon">🛡️</div>

        <h1>Phishing Guard</h1>
        <p className="subtitle">
          Check whether a website looks safe before you visit it.
        </p>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={checkUrl}>Check URL</button>

        {result && (
          <div className="result-box">
            <h2 className={riskClass}>{result}</h2>
            <p>Risk Score: {risk}/100</p>

            <div className="risk-bar">
              <div
                className={`risk-fill ${barClass}`}
                style={{ width: `${risk}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
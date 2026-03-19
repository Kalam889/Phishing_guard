import { useState } from "react";
function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [risk, setRisk] = useState(0);
  function checkUrl() {
      fetch("https://phishing-guard-cpjm.onrender.com/url",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({url:url})  
    })
    .then(res => res.json())
    .then(data => {
        setResult(data.result);
        setRisk(data.risk)
    });
  }
  return (
    <div>
      <input type="text" value={url} placeholder="Enter your url" onChange={(e) => setUrl(e.target.value)} /> <br/>
      <button onClick={checkUrl}>Check</button>

      <h2>Result: {result}</h2>
      <p>Risk Score: {risk}</p>
    </div>
  )
}
export default App;
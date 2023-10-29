import React, { useState } from "react";
import "./style/style.css";

function PDFSummary() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [jresult, setJresult] = useState("");
  const [error, setError] = useState("");
  const [maxWords, setMaxWords] = useState("100");
  const [selectedFile, setSelectedFile] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue) {
      setError("Please enter a prompt!");
      setPrompt("");
      setResult("");
      setJresult("");
      return;
    }

    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputValue }),
    });

    try {
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPrompt(inputValue);
        setResult(data.data.choices[0].text);
        setJresult(JSON.stringify(data.data, null, 2));
        setInputValue("");
        setError("");
      } else {
        throw new Error("An error occurred");
      }
    } catch (error) {
      console.log(error);
      setResult("");
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="container">
      <div className="hero d-flex align-items-center justify-content-center text-center flex-column p-3">
        <h1 className="display-4">PDF Book Summary</h1>
        <p className="lead">Summarize PDF Book for Effecient Reading!</p>

        <form className="w-100">
          <input type="file" accept=".pdf" onChange={handleFileChange}></input>

          <div className="form-group row">
            <div className="col-sm-4 offset-sm-4 mt-3">
              <input
                type="number"
                min="10"
                value={maxWords}
                onChange={(e) => setMaxWords(e.target.value)}
                className="form-control"
              ></input>
            </div>
            <button
              type="submit"
              disabled={!selectedFile || loading}
              className="btn btn-primary custom-button mt-1"
            >
              {loading
                ? "Analyzing PDF..."
                : `Summarize PDF in about ${maxWords} words`}
            </button>
          </div>
        </form>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {result && <div className="alert alert-success mt-3">{result}</div>}
      {result && (
        <pre className="alert alert-info mt-3">
          <code>{jresult}</code>
        </pre>
      )}
    </div>
  );
}

export default PDFSummary;

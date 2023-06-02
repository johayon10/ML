import React, { useState } from "react";
import axios from "axios";
import "./Generator.css";
import env from "react-dotenv";

import Spinner from "./Spinner"; // Import the spinner component

const Generator = () => {
  // Define the state variables
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false); // Define a loading state
  const [error, setError] = useState(null); // Define an error state

  // Define the function that handles the form submission
  const handleSubmit = async (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Set the loading state to true
    setLoading(true);
    // Call the API using axios
    try {
      const response = await axios.post(
        `${env.API_URL}/generate`,
        { text: input } // Pass only text to the API
      );
      // Check if the response status is OK
      if (response.status === 200) {
        // Set the output state to the response data
        setOutput(response.data.text);
        // Clear the error state
        setError(null);
      } else {
        // Throw an error with the response status text
        throw new Error(response.statusText);
      }
    } catch (error) {
      // Handle the error
      console.error(error);
      // Set the error state to the error message
      setError(error.message);
    } finally {
      // Set the loading state to false
      setLoading(false);
    }
  };

  // Define the function that handles the input change
  const handleChange = (e) => {
    // Set the input state to the input value
    setInput(e.target.value);
  };

  // Define the function that handles the clear button click
  const handleClear = () => {
    // Clear the input and output states
    setInput("");
    setOutput("");
  };

  // Return the JSX element
  return (
    <div className="generator container">
      <div className="output chat-bubble"> {/* Add a class name for the chat bubble */}
        {/* Use a code block with a language specifier to format the output as C++ code */}
        {(!loading && input !== '') && <pre><code class="language-cpp">{output}</code></pre>}
        {/* Use a spinner component to show the loading indicator */}
        {loading && <Spinner />}
        {/* Use an alert component to show the error message */}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <form onSubmit={handleSubmit} className="fixed-bottom bg-white p-3">
      <div className="form-group">
  <div className="input-group" style={{width:"80vw"}}>
    <input
      type="text"
      id="text"
      name="text"
      value={input}
      onChange={handleChange}
      className="form-control"
    />
   
  </div>
  <div style={{display:"flex", flexDirection:"horizontal", justifyContent:"space-between"}}>
      <button type="submit" className="btn btn-primary">Generate</button>
      {/* Add a clear button that calls the handleClear function */}
      <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
    </div>
</div>

      </form>
    </div>
  );
};

export default Generator;

import React, { useState } from "react";

function NewQuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const questionObj = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex, 10),
    };
    onAddQuestion(questionObj);
    // Reset form
    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  }

  function handleAnswerChange(idx, value) {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <div>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        {answers.map((ans, idx) => (
          <label key={idx}>
            Answer {idx + 1}:
            <input
              type="text"
              value={ans}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
              required
            />
          </label>
        ))}
      </div>
      <label>
        Correct Index:
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(e.target.value)}
        >
          {answers.map((_, idx) => (
            <option key={idx} value={idx}>
              {idx}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;

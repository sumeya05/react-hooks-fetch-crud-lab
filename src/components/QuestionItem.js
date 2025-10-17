import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    onDeleteQuestion(id);
  }

  function handleCorrectChange(e) {
    const newIndex = parseInt(e.target.value, 10);
    onUpdateQuestion(id, newIndex);
  }

  return (
    <li>
      <p>{prompt}</p>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectChange}>
          {answers.map((ans, idx) => (
            <option key={idx} value={idx}>
              {ans}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default QuestionItem;

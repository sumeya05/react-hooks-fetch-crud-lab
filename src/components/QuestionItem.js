function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleSelectChange(e) {
    const newIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        // Optional: update local UI (if parent doesn't re-fetch)
        question.correctIndex = updatedQuestion.correctIndex;
      });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <ul>
        {answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleSelectChange}>
          {answers.map((_, i) => (
            <option key={i} value={i}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

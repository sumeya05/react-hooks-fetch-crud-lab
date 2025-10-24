function QuestionList({ questions, onDelete }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(id);
    });
  }

  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <h4>{q.prompt}</h4>
            <button onClick={() => handleDelete(q.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

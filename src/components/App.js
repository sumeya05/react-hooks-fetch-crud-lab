import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import NewQuestionForm from "./NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setQuestions(data);
        }
      })
      .catch((err) => console.error("Fetch questions failed:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((added) => {
        setQuestions([...questions, added]);
        // Optionally hide form or switch view
        setShowForm(false);
        setShowQuestions(true);
      })
      .catch((err) => console.error("Add question failed:", err));
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setQuestions(questions.filter((q) => q.id !== id));
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  }

  function handleUpdateQuestion(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const updatedList = questions.map((q) =>
          q.id === updated.id ? updated : q
        );
        setQuestions(updatedList);
      })
      .catch((err) => console.error("Update failed:", err));
  }

  return (
    <main>
      <h1>QuizMaster Admin</h1>
      <button
        onClick={() => {
          setShowQuestions(!showQuestions);
          setShowForm(false);
        }}
      >
        {showQuestions ? "Hide Questions" : "View Questions"}
      </button>

      {showQuestions && (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}

      <button
        onClick={() => {
          setShowForm(!showForm);
          setShowQuestions(false);
        }}
      >
        {showForm ? "Cancel" : "New Question"}
      </button>

      {showForm && <NewQuestionForm onAddQuestion={handleAddQuestion} />}
    </main>
  );
}

export default App;

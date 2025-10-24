import { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import NewQuestionForm from "./NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  return (
    <main>
      <h1>Quiz Admin Panel</h1>
      <button onClick={() => setShowQuestions(false)}>New Question</button>
      <button onClick={() => setShowQuestions(true)}>View Questions</button>

      {showQuestions ? (
        <QuestionList questions={questions} onDelete={handleDeleteQuestion} />
      ) : (
        <NewQuestionForm onAddQuestion={handleAddQuestion} />
      )}
    </main>
  );
}

export default App;

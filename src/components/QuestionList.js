// src/components/QuestionList.js
import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <div>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
              onDeleteQuestion={onDeleteQuestion}
              onUpdateQuestion={onUpdateQuestion}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionList;

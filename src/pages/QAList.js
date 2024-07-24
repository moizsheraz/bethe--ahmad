import React from "react";
import "../styles/QAlistUser.css";

const QAList = ({ questions, updateAnswer, childName }) => {
  return (
    <div className="qa-list">
      <h2>{childName}'s Questions</h2>
      {questions.map((q, index) => (
        <div key={index} className="question-item">
          <h3 className="question-text">{q.question}</h3>
          <div className="options-container">
            {q.options.length > 0 ? (
              q.options.map((option, idx) => (
                <label
                  key={idx}
                  className="option-label"
                  aria-label={`Option ${idx + 1}`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={q.answer === option}
                    onChange={() => updateAnswer(q.question, option)}
                    aria-checked={q.answer === option}
                  />
                  <span className="option-text">{option}</span>
                </label>
              ))
            ) : (
              <textarea
                name={`question-${index}`}
                value={q.answer}
                onChange={(e) => updateAnswer(q.question, e.target.value)}
                placeholder="Type your answer here"
                aria-label={`Answer for question ${index + 1}`}
                className="text-area"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QAList;

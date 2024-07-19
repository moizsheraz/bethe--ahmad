import React, { useEffect, useState } from 'react';
import '../styles/qalist.css';

const QAList = ({ questions, updateAnswer, childName }) => {
  const [tempAnswers, setTempAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(childName + 'Answers');
    return savedAnswers ? JSON.parse(savedAnswers) : questions.reduce((acc, question) => {
      acc[question.question] = question.answer || '';
      return acc;
    }, {});
  });

  useEffect(() => {
    localStorage.setItem(childName + 'Answers', JSON.stringify(tempAnswers));
  }, [tempAnswers, childName]);

  const handleAnswerChange = (question, newAnswer) => {
    setTempAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: newAnswer
    }));
  };
  
  const submitAnswer = (question) => {
    updateAnswer(childName, question, tempAnswers[question]);
  };

  return (
    <div className="qa-container">
      <h2 className="qa-header">Questions and Answers for {childName}</h2>
      <ul className="qa-list">
        {questions.map((qa, index) => (
          <li key={index} className="qa-item">
            <strong className="qa-question">{qa.question}</strong>
            <input 
              type="text" 
              className="qa-input" 
              value={tempAnswers[qa.question] || ''} 
              onChange={(e) => handleAnswerChange(qa.question, e.target.value)} 
            />
          </li>
        ))}
            <div className="qa-btns">
            <button 
              className="qa-button"
              onClick={() => submitAnswer()}
            >
              Submit Answer
            </button>
            </div>
      </ul>
    </div>
  );
};

export default QAList;

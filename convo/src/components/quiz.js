import React from 'react'
import { Card, Form } from "react-bootstrap";




const quizQuestions = [
    {
      question: "What is the capital of France?",
      answers: [
        { content: "London", isCorrect: false },
        { content: "Paris", isCorrect: true },
        { content: "Berlin", isCorrect: false },
        { content: "Rome", isCorrect: false }
      ]
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { content: "Jupiter", isCorrect: true },
        { content: "Saturn", isCorrect: false },
        { content: "Mars", isCorrect: false },
        { content: "Earth", isCorrect: false }
      ]
    },
    {
      question: "What is the name of the longest river in Africa?",
      answers: [
        { content: "Nile", isCorrect: true },
        { content: "Amazon", isCorrect: false },
        { content: "Yangtze", isCorrect: false },
        { content: "Mississippi", isCorrect: false }
      ]
    }
  ];

const Quiz = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

    };

  return (
    <div className="container mt-3">
      <h1 className="text-left mb-0">Quiz Example</h1>
      <Form onSubmit={handleSubmit}>
        {quizQuestions.map((question, index) => (
          <Card key={index} className="mb-1 border-0">
            <Card.Body>
              <Card.Title>Question {index + 1}: {question.question}</Card.Title>
              {question.answers.map((answer, answerIndex) => (
                <Form.Check
                  key={answerIndex}
                  type="radio"
                  id={`question-${index}-answer-${answerIndex}`}
                  label={answer.content}
                  name={`question-${index}`}
                  value={answer.content}
                  className = {"bubble"}
                  onChange={() => {
                    if (answer.isCorrect) {
                    //  alert("Correct answer!");
                    } else {
                     // alert("Incorrect answer.");
                    }
                  }}
                />
              ))}
            </Card.Body>
          </Card>
        ))}
        <button className="btn btn-primary" style={{backgroundColor:'black' , borderColor:'black', marginLeft:'18px'}}type="submit">Submit</button>
      </Form>
    </div>
  )
}

export default Quiz
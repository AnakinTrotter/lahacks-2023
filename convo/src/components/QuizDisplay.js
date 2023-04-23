import React from 'react'
import { Card, Form } from "react-bootstrap";
import { useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import { handler } from '@/pages/api/quizquery'



  export default function QuizDisplay(props) {
    const router = useRouter()

    const submitQuiz = () => {
        console.log(props.uuid)
        router.push(`/quiz/${props.uuid}`)
    }

    
    return (
        <Container fluid style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <div id="top" className="row" style={{ borderBottom: '2px solid black', position: 'absolute', backgroundColor: 'white', height: '10vh', width: '100%' }}>
                <div >
                    <h1>Convo</h1>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
                  {props.paragraphs.map((item, index) => (
                      <p>
                          {item}
                      </p>
                  ))}
                </div>

                <div className="col" style={{ paddingTop: '10vh', maxHeight: '100vh', borderRight: '2px solid black' }}>
                    <Quiz/>
                </div>
            </div>
        </Container>

    );
}
function Quiz(){
  let score = 0
  const handleSubmit = (event) => {
    event.preventDefault();
    let numCorrect = 0;
  
    const selectedAnswers = [];
    quizQuestions.forEach((question, index) => {
      const selectedAnswer = document.querySelector(
        `input[name="question-${index}"]:checked`
      );

      const answerBubble = document.getElementById(
        `question-${index}-answer-${question.answers.findIndex(
          (answer) => answer.content === selectedAnswer?.value
        )}`
      );
      const selectInputs = document.querySelectorAll('.form-check-input');
      selectInputs.forEach((input) => {
        input.disabled = true;
      });
      console.log(answerBubble)
      if (selectedAnswer && selectedAnswer.value) {
        const selectedContent = selectedAnswer.value;
        const answer = question.answers.find(
          (answer) => answer.content === selectedContent
        );
        if (answer && answer.isCorrect) {
          numCorrect++
          selectedAnswers[index] = true;
        } else {
          selectedAnswers[index] = false;
        }
        if (answerBubble) {
          if (answer.isCorrect) {
            answerBubble.style.backgroundColor = "lightgreen";
          } else {
            answerBubble.style.backgroundColor = "salmon";
          }
        }
      }
    });
    quizQuestions.forEach((question, index) => {
      const selectedAnswer = document.querySelector(
        `input[name="question-${index}"]:checked`
      );
      const answerBubbles = document.querySelectorAll(
        `input[name="question-${index}"] + label`
      );
      question.answers.forEach((answer, answerIndex) => {
        const answerBubble = answerBubbles[answerIndex];
        if (answer && answer.isCorrect) {
          if (answerBubble) {
            answerBubble.style.backgroundColor = "lightgreen";
          }
        } else {
          if (answerBubble) {
            answerBubble.style.backgroundColor = "salmon";
          }
        }
      });
      if (selectedAnswer && selectedAnswer.value) {
        const selectedContent = selectedAnswer.value;
        const answer = question.answers.find(
          (answer) => answer.content === selectedContent
        );
        if (answer && answer.isCorrect) {
          selectedAnswers[index] = true;
        } else {
          selectedAnswers[index] = false;
        }
      }
    });
    console.log(`Score: ${numCorrect} out of ${quizQuestions.length}`);
  };
  return (
    <div className="container mt-3">
      <h1 className="text-left mb-0">Quiz Example</h1>
      <Form onSubmit={handleSubmit}>
        {quizQuestions.map((question, index) => (
          <Card key={index} className="mb-1 border-0">
            <Card.Body>
              <Card.Title>
                Question {index + 1}: {question.question}
              </Card.Title>
              {question.answers.map((answer, answerIndex) => (
                <Form.Check
                  key={answerIndex}
                  type="radio"
                  id={`question-${index}-answer-${answerIndex}`}
                  label={answer.content}
                  name={`question-${index}`}
                  value={answer.content}
                  correct={answer.isCorrect}
                  className="bubble"
                />
              ))}
            </Card.Body>
          </Card>
        ))}
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: "black",
            borderColor: "black",
            marginLeft: "18px",
          }}
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  )
}

// export default Quiz
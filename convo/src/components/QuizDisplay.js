import React from 'react'
import { Card, Form } from "react-bootstrap";
import { useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createSession } from '@/database/dbUtils';
import Modal from 'react-bootstrap/Modal'
import Header from './Header';

  export default function QuizDisplay(props) {
    let quizQuestions = props.questions;
    let submitted = false;  
    const router = useRouter()
    let numCorrect = 0;
    const handleSubmit = (event) => {
      numCorrect = 0;
      event.preventDefault();
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
      const header = document.querySelector('.text-left.mb-0');
      header.textContent = `Score: ${numCorrect} out of ${quizQuestions.length}`;
      const submit = document.querySelector("button");
      submit.textContent = "View Study Session Results"
      submit.onlick = viewInfo();
      submitted = true;
    };
    function viewInfo(){
      if(submitted == true){
        let number = (numCorrect/3)*100;
        console.log(number)
        localStorage.setItem('percent', number.toFixed(0))
        router.push(`/results/${props.uuid}`)
      }
    }
    return (
        <Container fluid style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <Header/>
            <div className="row align-items-start">
                <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
                  {props.paragraphs.map((item, index) => (
                      <p>
                          {item}
                      </p>
                  ))}
                </div>

                <div className="col" style={{ paddingTop: '10vh', maxHeight: '100vh', borderRight: '2px solid black' }}>
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

                    <button type="submit" className="btn btn-secondary btn-lg">Submit Quiz</button>
                  </Form>
                </div>
                </div>
            </div>
        </Container>

    );
}


// export default Quiz
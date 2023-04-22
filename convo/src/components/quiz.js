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
  export default function QuizDisplay(props) {
    const router = useRouter()
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    const takeQuiz = () => {
        console.log(props.uuid)
        router.push(`/quiz/${props.uuid}`)
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClickUp = () => {
        if (index < props.paragraphs.length - 1) {
            setIndex(index + 1);
        }
        else{
            handleShow();
        }
    };
    const handleClickDown = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    return (
        <Container fluid style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Done Quizzing?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Congrats on finishing the quiz! Click next if you are ready to submit</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Return to Quiz
                </Button>
                <Button variant="primary" onClick={takeQuiz}>
                    Submit Quiz
                </Button>
                </Modal.Footer>
            </Modal>
            <div id="top" className="row" style={{ borderBottom: '2px solid black', position: 'absolute', backgroundColor: 'white', height: '10vh', width: '100%' }}>
                <div >
                    <h1>Convo</h1>
                </div>
            </div>
            {/* <div style = {{position: 'absolute', bottom: '90vh', right: '15vh'}}>
                    <Button onClick={handleClickDown} class="btn btn-secondary btn-sm" min-width = "10vh">Previous</Button>
                </div>
                <div style = {{position: 'absolute', bottom: '90vh', right: '0'}}>
                    <Button onClick={handleClickUp} class="btn btn-secondary btn-sm">Next</Button>
                </div> */}
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

// export default Quiz
import React from 'react'
import { Card, Form } from "react-bootstrap";
import { useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import StudyMastery from './StudyMastery';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'

  export default function StudyDisplay(props) {
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

                <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', maxHeight: '100vh', borderRight: '2px solid black' }}>
                    <StudyMastery insights = {props.paragraphs} paragraphs = {props.paragraphs} percent = {props.percent}/>
                </div>
            </div>
        </Container>

    );
}

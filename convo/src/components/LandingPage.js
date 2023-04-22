import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap';
import InfoText from '@/components/InfoText';
import Header from './Header';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createSession } from '@/database/dbUtils';
import crypto from "crypto"

const LandingPage = () => {
  const router = useRouter()

  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!textareaValue || textareaValue === "") {
      return
    }

    // split text into paragraphs
    const paragraphs = textareaValue.split(/\n\n/)
    const uuid = crypto.randomUUID()
    createSession(uuid, paragraphs)

    // create the value in localStorage from the uuid
    router.push(`/study/${uuid}`)
  };



  return (
    <Container fluid style={{ maxHeight: '100vh' }}>
      <Header/>
      <div className="row align-items-start">
        <div className="col" style={{ paddingTop: '10vh', height: '100vh', borderRight: '2px solid black' }}>
          <div style={{ margin: '10px' }}>
            <InfoText />
          </div>
        </div>

        <div className="col" style={{ paddingTop: '10vh', height: '100vh', borderRight: '2px solid black' }}>
          <div>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formBasicInput form-inline">
                <Form.Label style={{ fontSize: '40px' }}>Hi Calvin! What can I help you with?</Form.Label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" onChange={handleTextareaChange}></textarea>
              </Form.Group>
              <Button style={{ backgroundColor: "black", border: 'none', marginTop: '10px' }} type="submit">let's chat</Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LandingPage
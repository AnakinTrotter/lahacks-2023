import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap';
import InfoText from '@/components/InfoText';
import Header from './Header';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createSession } from '@/database/dbUtils';
import { v4 as uuidv4 } from 'uuid';
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
    localStorage.setItem('fullPassage', textareaValue)
    const paragraphs = textareaValue.split(/\n\n/)
    const uuid = uuidv4()
    createSession(uuid, paragraphs)

    // create the value in localStorage from the uuid
    router.push(`/study/${uuid}`)
  };



  return (
    <Container fluid style={{ maxHeight: '100vh' }}>
      <div className="row align-items-start">
        <div className="col" style={{height: '100vh', borderRight: '2px solid black' }}>
          <div style={{ margin: '10px' }}>
            <InfoText />
          </div>
        </div>

        <div className="col" style={{ paddingTop: '10vh', height: '100vh', borderRight: '2px solid black' }}>
          <div>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formBasicInput form-inline">
                <Form.Label className="hi-there">Hi There! What can I help you with?</Form.Label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="20" onChange={handleTextareaChange} placeholder="Please paste your passage here..."></textarea>
              </Form.Group>
              <Button className="lets-chat-button"style={{ backgroundColor: "black", border: 'none', marginTop: '10px' }} type="submit">Let's chat!</Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LandingPage
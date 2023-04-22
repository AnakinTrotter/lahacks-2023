import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import Quiz from '@/components/quiz';
import InfoText from '@/components/InfoText';
import { useState } from 'react';


const LandingPage = () => {

    const [textareaValue, setTextareaValue] = useState('');

    const handleTextareaChange = (event) => {
      setTextareaValue(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log(textareaValue);
      // Submit textareaValue to server or perform other actions here
    };

    

  return (
    <Container fluid style ={{maxHeight:'100vh', overflowY: 'scroll'}}>
    <div className="row" style ={{borderBottom: '2px solid black', position:'absolute', backgroundColor:'white', height:'10vh', width:'100%'}}>
                <h1>Convo</h1>
                
    </div>
    <div className="row align-items-start">
        <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
            <div style={{margin:'20px'}}>
                <InfoText/>
            </div>
        </div>

        <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
            <div style={{margin:'20px'}}>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formBasicInput form-inline">
                        <Form.Label style={{fontSize:'40px'}}>Hi Calvin! What can I help you with?</Form.Label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </Form.Group>
                    <Button style={{backgroundColor:"black" ,border:'none', marginTop:'10px'}}type="submit">let's chat</Button>
                </Form>
            </div>
        </div>
    </div>
    </Container>
  )
}

export default LandingPage
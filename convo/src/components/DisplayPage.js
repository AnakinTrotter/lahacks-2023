import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

    export default function DisplayPage(props) {
        return (
            <Container fluid style ={{maxHeight:'100vh', overflowY: 'scroll'}}>
                <div className="row" style ={{borderBottom: '2px solid black', position:'absolute', backgroundColor:'white', height:'10vh', width:'100%'}}>
                            <h1>Convo</h1>
                            
                </div>
                <div className="row align-items-start">
                    <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
                        {props.paragraphs.map((string, index) => (
                            <p key={index}>{string}</p>
                        ))}
                    </div>

                    <div className="col" style={{  paddingTop: '10vh', maxHeight: '100vh',  borderRight: '2px solid black' }}>
                        <div className="row" style={{ borderBottom: '2px solid black', overflowY:'scroll', height:'30vh'}}>     
                            {props.paragraphs.map((string, index) => (
                                <p key={index}>{string}</p>
                            ))}
                            <Button>next</Button>
                        </div>
                        <div className="row" style={{height: "100%"}}> 
                            <Chat questions={props.questions}/>
                        </div>
                    </div>
                </div>
                </Container>

    );
    }

  
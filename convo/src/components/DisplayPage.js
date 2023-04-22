import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

    export default function DisplayPage(props) {
        return (
            <Container fluid style ={{maxHeight:'100vh', overflowY: 'scroll'}}>
                <div class="row" style ={{borderBottom: '1px solid black'}}>
                            <h1>Convo</h1>
                </div>
                <div class="row align-items-start">
                    <div class="col" style={{ overflowY: 'scroll', height: '100vh', borderRight: '1px solid black' }}>
                    {props.paragraphs.map((string, index) => (
                         <p key={index}>{string}</p>
                    ))}
                    </div>
                    <div class="col" style={{ overflowY: 'scroll', height: '100vh', borderRight: '1px solid black' }}>
                        <div class="row" style={{ borderBottom: '1px solid black', overflowY:'scroll', height:'30vh'}}>     
                            <h1>ROW 1</h1>  
                            <img src="https://i.imgur.com/WBtsj0F.png" />
                        </div>
                        <div class="row"> 
                            <Chat questions={props.questions}/>
                        </div>
                    </div>
                </div>
                </Container>

    );
    }

  
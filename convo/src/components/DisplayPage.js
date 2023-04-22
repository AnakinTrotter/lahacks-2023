import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
    function DisplayParagraph(props){
        return (
            <div>
                
                {props.paragraphs.map((item, index) => (
                    <p key={index} style = {{backgroundColor: index === props.indexNum ? 'yellow' : 'transparent',}}>
                        {item}
                    </p>
                ))}


            </div>
        );
    }

    function DisplayApiCall(props){
        return (
            <div>
                <p>
                    {props.paragraphs[props.indexNum]}
                </p>
            </div>
        );
    }

    export default function DisplayPage(props) {
        const [index, setIndex] = useState(0);
        const handleClickUp = () => {
            if(index < props.paragraphs.length-1){
                setIndex(index + 1);
            }
        };
        const handleClickDown = () => {
            if(index > 0){
                setIndex(index - 1);
            }
        };
        return (
            <Container fluid style ={{maxHeight:'100vh', overflowY: 'auto'}}>
                <div className="row" style ={{borderBottom: '2px solid black', position:'absolute', backgroundColor:'white', height:'10vh', width:'100%'}}>
                            <h1>Convo</h1>
                            
                </div>
                <div className="row align-items-start">
                    <div className="col" style={{ paddingTop: '10vh', overflowY: 'scroll', height: '100vh', borderRight: '2px solid black' }}>
                        <DisplayParagraph paragraphs = {props.paragraphs} indexNum = {index}/>
                    </div>

                    <div className="col" style={{  paddingTop: '10vh', maxHeight: '100vh',  borderRight: '2px solid black' }}>
                        <div className="row" style={{ borderBottom: '2px solid black', overflowY:'scroll', height:'30vh'}}>     
                            <DisplayApiCall paragraphs = {props.paragraphs} indexNum = {index}/>
                            <Button onClick={handleClickDown}>Previous</Button>
                            <Button onClick={handleClickUp}>Next</Button>

                        </div>
                        <div className="row" style={{ height: "58vh" }}>
                        <Chat questions={props.questions} />
                    </div>
                    </div>
                </div>
                </Container>

    );
    }



  
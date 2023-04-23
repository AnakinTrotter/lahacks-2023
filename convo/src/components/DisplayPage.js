import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Header from './Header';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { BsChevronLeft,BsChevronRight} from "react-icons/bs";

import logo from '../../public/next.svg'

function DisplayParagraph(props) {
    const highlightedRef = useRef(null);

    useEffect(() => {
        if (highlightedRef.current) {
            highlightedRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',

            });
        }
    }, [props.indexNum]);

    return (
        <div>
            {props.paragraphs.map((item, index) => (
                <p
                    key={uuidv4()}
                    ref={index === props.indexNum ? highlightedRef : null}
                    style={{
                        textDecoration: index === props.indexNum ? 'bold' : 'none',
                        //fontWeight: index === props.indexNum ? 'bold' : 'none',
                        backgroundColor: index === props.indexNum ? '#B8b8b8' : 'none',
                        color: index === 'black',
                        fontSize:'14px',
                        padding: '10px'
                    }}
                >
                    {item}
                </p>
            ))}
        </div>
    );
}

function DisplayApiCall(props) {
    return (
        <div>
                {props.paragraphs[props.indexNum]}
        </div>
    );
}

export default function DisplayPage(props) {
    const router = useRouter()
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    const takeQuiz = () => {
        router.push(`/quiz/${props.uuid}`)
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClickUp = () => {
        if (index < props.paragraphs.length - 1) {
            setIndex(index + 1);
        }
        else {
            handleShow();
        }
    };
    const handleClickDown = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    return (
        <>
        <head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"/> */}
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
            </style>
        </head>
        {<Container fluid style={{ maxHeight: '100vh', overflowY: 'auto' }}>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Convo Finished</Modal.Title>
                </Modal.Header>
                <Modal.Body>Congrats on making it through the text! Click the "Take Quiz" button to move onto the quiz</Modal.Body>
                <Modal.Footer>   
                    <Button variant="secondary" onClick={handleClose}>
                        Return to conversation
                    </Button>
                    <Button variant="primary" style={{ backgroundColor: 'black', color: 'white', border: '0px' }} onClick={takeQuiz}>
                        Take Quiz
                    </Button>
                    
                </Modal.Footer>
            </Modal>
            {/* <div style = {{position: 'absolute', bottom: '90vh', right: '15vh'}}>
                    <Button onClick={handleClickDown} class="btn btn-secondary btn-sm" min-width = "10vh">Previous</Button>
                </div>
                <div style = {{position: 'absolute', bottom: '90vh', right: '0'}}>
                    <Button onClick={handleClickUp} class="btn btn-secondary btn-sm">Next</Button>
                </div> */}
            <div className="row align-items-start">
                <div className="col" style={{ display:'flex', flexDirection:'column', alignContent:'flex-start', justifyContent:'center', alignItems:'center',overflowY: 'scroll', height: '100vh', background:'black'}}>
                    <div  style = {{width:'70%'}}className= "logo" > Convo</div>
                    <div style={{backgroundColor:'white', padding:'20px',borderRadius:'20px', width:'70%', height:'80vh'}}>
                        <DisplayParagraph paragraphs={props.paragraphs} indexNum={index} />
                    </div>
                </div>

                <div className="col" style={{ display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'flex-start', alignItems:'center',overflowY: 'scroll', height: '100vh', textAlign:'flex-start', paddingTop:'10vh'}}>
                    <div style={{width:'75%', paddingBottom:'10px'}}>
                        <b>Paraphrased version:</b>
                    </div>
                    
                    <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between',alignItems:'center', overflowY: 'scroll', width:'90%',marginBottom:'6vh'}}>
                    <BsChevronLeft style = {{paddingRight:'-30px'}} onClick={handleClickDown} />  

                    <div className="row" style={{ border: '0.5px solid black', 
                                                  overflowY: 'scroll',
                                                  height: '35vh', 
                                                  borderRadius:'20px',
                                                  backgroundColor:'#d9d9d9',
                                                  paddingTop:'20px',
                                                  fontSize:'14px',
                                                  width:'90%',
                                                  paddingRight:'-100px' }}>
                            
                        <DisplayApiCall paragraphs={props.paragraphs} indexNum={index} />
                     </div>
                    <BsChevronRight  style = {{}}onClick={handleClickUp} />  
                            
                   

                    </div>
                    {/* <div className="row" style={{ borderBottom: '2px solid black', overflowY: 'scroll', height: '5vh' }}>
                        <Button onClick={handleClickDown} className="btn btn-secondary btn-sm" style={{
                            width: '50%', backgroundColor: 'white', color: 'black', borderRadius: '0px', borderColor: 'black',
                            borderTop: '0px',
                            borderLeft: '0px',
                            borderBottom: '0px',
                        }}>Previous</Button>
                        <Button onClick={handleClickUp} className="btn btn-secondary btn-sm" style={{
                            width: '50%', backgroundColor: 'white', color: 'black', borderRadius: '0px', borderColor: 'black',
                            borderTop: '0px',
                            borderRight: '0px',
                            borderBottom: '0px',
                        }}>Next</Button>
                    </div> */}

                    <div className="row" style={{ height: "30vh", width:'80%', paddingTop:'20px' }}>
                        <Chat questions={props.questions[index]}
                            index={index}
                            uuid={props.uuid}
                            key={uuidv4()} />
                    </div>
                </div>
            </div>
        </Container>}
        </>

    );
}




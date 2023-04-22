import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Chat from "@/components/Chat"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import { useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
// function DisplayParagraph(props){
//     return (
//         <div>
//             {props.paragraphs.map((item, index) => (
//                 <p key={index} style = {{backgroundColor: index === props.indexNum ? 'yellow' : 'transparent',}}>
//                     {item}
//                 </p>
//             ))}
//         </div>
//     );
// }



// function DisplayParagraph(props) {
//   const highlightedRef = useRef(null);

//   useEffect(() => {
//     const element = highlightedRef.current;
//     const yOffset = 10; 
//     const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//     if (highlightedRef.current) {
//         highlightedRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start',
//             inline: 'nearest',
//           });
//         highlightedRef.current.scrollTop += 10;
//         // window.scrollTo({top: 100, behavior: 'smooth'}); 
//     }


//   }, [props.indexNum]);

//   return (
//     <div>
//       {props.paragraphs.map((item, index) => (
//         <p
//           key={index}
//           style={{ backgroundColor: index === props.indexNum ? 'yellow' : 'transparent' }}
//           ref={index === props.indexNum ? highlightedRef : null}
//         >
//           {item}
//         </p>
//       ))}
//     </div>
//   );
// }



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
                    key={crypto.randomUUID()}
                    ref={index === props.indexNum ? highlightedRef : null}
                    style={{
                        textDecoration:  index === props.indexNum ? 'bold' : 'none',
                        //fontWeight: index === props.indexNum ? 'bold' : 'none',
                        backgroundColor: index === props.indexNum ? 'black' : 'none',
                        color: index === props.indexNum ? 'white' : 'black',
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
            <p>
                {props.paragraphs[props.indexNum]}
            </p>
        </div>
    );
}

export default function DisplayPage(props) {
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
                <Modal.Title>Convo Finished</Modal.Title>
                </Modal.Header>
                <Modal.Body>Congrats on making it through the text! Click the "Take Quiz" button to move onto the quiz</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Return to conversation
                </Button>
                <Button variant="primary" onClick={takeQuiz}>
                    Take Quiz
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
                    <DisplayParagraph paragraphs={props.paragraphs} indexNum={index} />
                </div>

                <div className="col" style={{ paddingTop: '10vh', maxHeight: '100vh', borderRight: '2px solid black' }}>
                    <div className="row" style={{ borderBottom: '2px solid black', overflowY: 'scroll', height: '30vh' }}>
                        <DisplayApiCall paragraphs={props.paragraphs} indexNum={index} />
                    </div>
                    <div className="row" style={{ borderBottom: '2px solid black', overflowY: 'scroll', height: '5vh' }}>
                        <Button onClick={handleClickDown} className="btn btn-secondary btn-sm" style={{ width: '50%', backgroundColor:'white', color:'black',borderRadius:'0px',borderColor:'black',
                        borderTop:'0px',
                        borderLeft:'0px',
                        borderBottom:'0px',
                     }}>Previous</Button>
                        <Button onClick={handleClickUp} className="btn btn-secondary btn-sm" style={{  width: '50%', backgroundColor:'white', color:'black',borderRadius:'0px',borderColor:'black',
                        borderTop:'0px',
                        borderRight:'0px',
                        borderBottom:'0px',
                        }}>Next</Button>
                    </div>
                    <div className="row" style={{ height: "53vh" }}>
                        <Chat questions={props.questions} />
                    </div>
                </div>
            </div>
        </Container>

    );
}




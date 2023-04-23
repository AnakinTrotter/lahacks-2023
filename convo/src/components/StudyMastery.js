import { useState, useEffect } from "react";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


const StudyMastery = (props) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let interval;
        if (percent < props.percent) {
            interval = setInterval(() => {
                setPercent((prevPercent) => prevPercent + 1);
            }, 20);
        }
        return () => clearInterval(interval);
    }, [percent]);

    return (
        <Container   >
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="text-center">
                    <CircularProgressbar
                        styles={buildStyles({
                            // The color of the progress bar
                            pathColor: 'black',
                            // The color of the text inside the progress bar
                            textColor: 'black',
                          })}
                        backgroundColor={'red'}
                        value={props.percent}
                        text={`${props.percent}%`}
                        strokeWidth={10}
                    />
                </div>
                <ListGroup className="mb-4 mt-3">
                {props.insights.slice(0, 5).map((insight, index) => (
                    <ListGroup.Item key={index} className="border-0">
                        <span className="fw-bold me-2">{index + 1}.</span>
                        {insight}
                    </ListGroup.Item>
                ))}
                </ListGroup>
                <div className="d-grid">
                    <Button variant="success" size="lg" className="mb-3" href="/" style={{backgroundColor:'black'}}>
                        Ready for another Convo?
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default StudyMastery;

import { useState, useEffect } from "react";
import { ListGroup, Button, Container } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
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
        <Container className="py-5">
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="text-center">
                    <CircularProgressbar
                        value={percent}
                        text={`${percent}%`}
                        strokeWidth={10}
                    />
                </div>
                <ListGroup className="mb-4 mt-3">
                    {props.insights.map((insight, index) => (
                        <ListGroup.Item key={index} className="border-0">
                            <span className="fw-bold me-2">{index + 1}.</span>
                            {insight}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="d-grid">
                    <Button variant="success" size="lg" className="mb-3">
                        Ready for another Convo?
                    </Button>
                    <Button variant="outline-secondary" size="lg">
                        Review your last Convo
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default StudyMastery;

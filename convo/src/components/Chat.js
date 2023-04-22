import { useState, useRef, useEffect } from "react";
import { Card, Stack, Container, Form } from "react-bootstrap";

const continueMessage = "Nice job! Click next to keep learning."

const Bubble = (props) => {
    return (
        <Container className={`d-flex justify-content-${props.user ? "end" : "start"}`}>
            <Card
                className={`bg-${props.user ? "primary" : "success"} m-0 p-0`}
                style={{ width: "fit-content", minWidth: "4em" }}
            >
                <Card.Body className="text-white mb-1 p-2">
                    <p className={`text-center m-0 p-0`}>{props.text}</p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default function Chat(props) {
    const [chatMessages, setChatMessages] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const [chatDisabled, setChatDisabled] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        sendQuestion()
    }, [])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [chatDisabled])

    const sendQuestion = () => {
        if (questionIndex < props.questions.length) {
            setChatMessages((prev) => [
                ...prev,
                <Bubble text={props.questions[questionIndex]} user={false} key={crypto.randomUUID()} />
            ])
            setQuestionIndex((prev) => (prev + 1))
            setChatDisabled(false)
        } else {
            setChatMessages((prev) => [
                ...prev,
                <Bubble text={continueMessage} user={false} key={crypto.randomUUID()} />
            ])
            setChatDisabled(true)
        }
    }

    const sendChat = (message) => {
        if (!message || message === "") {
            return
        }
        setChatDisabled(true)
        setChatMessages((prev) => [
            ...prev,
            <Bubble text={message} user={true} key={crypto.randomUUID()} />
        ])
        setTimeout(() => {
            sendQuestion();
        }, 420);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendChat(event.target.value)
            event.target.value = ""; // clear the input field after submission
        }
    };

    return (
        <Container>
            <Stack gap={2}>{chatMessages}</Stack>
            <Form.Control
                as="textarea"
                rows={1}
                className="mt-5"
                onKeyDown={handleKeyDown}
                disabled={chatDisabled}
                ref={inputRef}
            />
        </Container>
    );
}

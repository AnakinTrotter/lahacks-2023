import { useState } from "react";
import { Card, Stack, Container, Form } from "react-bootstrap";

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

export default function Chat() {
    const [chatMessages, setChatMessages] = useState([])

    const sendChat = (message) => {
        setChatMessages([
            ...chatMessages,
            <Bubble text={message} user={true} />
        ])
        console.log(message)
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
            />
        </Container>
    );
}

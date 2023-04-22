import { useState, useRef, useEffect } from "react";
import { Card, Stack, Container, Form } from "react-bootstrap";
import crypto from "crypto"
const continueMessage = "Nice job! Click next to keep learning."

const Bubble = (props) => {
    return (
        <Container className={`d-flex justify-content-${props.user ? "end" : "start"}`}>
            <Card
                className={`m-0 p-0`}
                style={{
                    width: "fit-content",
                    minWidth: "4em",
                    backgroundColor: props.user ? "white" : "black",
                    color: props.user ? "black" : "white",
                }}
            >
                <Card.Body className=" mb-1 p-2">
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
    const chatContainerRef = useRef(null)

    useEffect(() => {
        const localStorageData = localStorage.getItem('sessions');
        const data = JSON.parse(localStorageData)[props.uuid].values[props.index]
        let start = 0
        if (data.answers) {
            for (let i = 0; i < data.answers.length; i++) {
                setChatMessages((prev) => [...prev, data.questions[i]]);
                setChatMessages((prev) => [...prev, data.answers[i]]);
            }
            start = data.answers.length
        }
        sendQuestion(start)
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [chatDisabled]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const sendQuestion = (index) => {
        if (index < props.questions.length) {
            setChatMessages((prev) => [...prev, props.questions[index]]);
            setQuestionIndex((prev) => (index + 1));
            setChatDisabled(false);
        } else {
            setChatMessages((prev) => [...prev, continueMessage]);
            setChatDisabled(true);
        }
    };

    const sendUser = (message) => {
        setChatMessages((prev) => [...prev, message]);

        const localStorageData = localStorage.getItem("sessions");
        const data = JSON.parse(localStorageData)[props.uuid].values[props.index];

        if (!data.answers) {
            data.answers = [message];
        } else {
            data.answers.push(message);
        }

        const newData = {
            ...JSON.parse(localStorageData),
            [props.uuid]: {
                ...JSON.parse(localStorageData)[props.uuid],
                values: [
                    ...JSON.parse(localStorageData)[props.uuid].values.slice(0, props.index),
                    {
                        ...JSON.parse(localStorageData)[props.uuid].values[props.index],
                        answers: data.answers
                    },
                    ...JSON.parse(localStorageData)[props.uuid].values.slice(props.index + 1),
                ]
            }
        };

        localStorage.setItem("sessions", JSON.stringify(newData));
    };

    const sendChat = (message) => {
        if (!message || message === "") {
            return;
        }
        setChatDisabled(true);
        sendUser(message);
        setTimeout(() => {
            sendQuestion(questionIndex);
        }, 420);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendChat(event.target.value);
            event.target.value = ""; // clear the input field after submission
        }
    };

    return (
        <Container className="mt-0 mb-0 p-0" style={{ position: "relative", height: "100%" }}>
            <Stack gap={2} style={{ overflowY: "scroll", height: "90%" }} className="m-0 pt-3" ref={chatContainerRef}>
                {chatMessages.map((message, index) => (
                    <Bubble
                        text={message}
                        user={index % 2 !== 0}
                        key={crypto.randomUUID()}
                    />
                ))}
            </Stack>
            <Form.Control
                as="textarea"
                rows={1}
                onKeyDown={handleKeyDown}
                disabled={chatDisabled}
                ref={inputRef}
                style={{ maxWidth: "95%", position: "absolute", left: "11px", bottom: 0 }}
            />
        </Container>
    );
}
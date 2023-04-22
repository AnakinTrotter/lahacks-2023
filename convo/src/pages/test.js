import Chat from "@/components/Chat"
import { Container } from "react-bootstrap"
import StudyMastery from "./mastery";

const questions = ["what is the capital of poland", "i hate school"]
const insights = [
    "Identify your learning style",
    "Set goals and track your progress",
    "Focus on comprehension, not memorization",
    "Take breaks and prioritize self-care",
    "Ask questions and seek help when needed",
];

export default function Test() {
    return <Container>
        <Chat questions={questions}/>
        <StudyMastery percent={40} insights={["hi", "bye"]} />
    </Container>
}
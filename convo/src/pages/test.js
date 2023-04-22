import Chat from "@/components/Chat"
import { Container } from "react-bootstrap"

const questions = ["what is the capital of poland", "i hate school"]

export default function Test() {
    return <Container>
        <Chat questions={questions}/>
    </Container>
}
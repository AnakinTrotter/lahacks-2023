import { Card, Stack } from "react-bootstrap";

const Bubble = (props) => {
    return (
        <Card className={`bg-${props.user ? "primary" : "success"}`}>
            <Card.Body className="text-white">
                <p className={`text-center m-0`}>{props.text}</p>
            </Card.Body>
        </Card>
    )
}

const messages = []
for (let i = 0; i < 5; i++) {
    messages.push(<Bubble text="sup" user={i % 2 == 0} />)
}

export default function Chat() {
    return <>
        <Stack gap={2}>
           { messages }
        </Stack>
    </>
}
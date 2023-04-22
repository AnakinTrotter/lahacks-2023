import DisplayPage from "@/components/DisplayPage"
import { useRouter } from 'next/router';

const questions = ["what is the capital of poland", "i hate school", "a", "b", "c", "d"]

export default function Study() {
    const router = useRouter();
    const { uuid } = router.query;
    const paragraphs = JSON.parse(localStorage.getItem('sessions'))[uuid].values

    return <DisplayPage paragraphs={paragraphs} questions={questions} />

}
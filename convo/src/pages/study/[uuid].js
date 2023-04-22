import DisplayPage from "@/components/DisplayPage"
import { useRouter } from 'next/router';

const questions = ["what is the capital of poland", "i hate school", "a", "b", "c", "d"]

export default function Study() {
    const router = useRouter();
    const { uuid } = router.query;
    const paragraphData = JSON.parse(localStorage.getItem('sessions'))[uuid].values
    const paragraphs = paragraphData.map((p) => p.original)

    // change to use just the one prop
    return <DisplayPage paragraphData={paragraphData} paragraphs={paragraphs} questions={questions} />

}
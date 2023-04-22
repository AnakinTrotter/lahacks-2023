import DisplayPage from "@/components/DisplayPage"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const questions = ["what is the capital of poland", "i hate school", "a", "b", "c", "d"]

export default function Study({ data }) {
    const router = useRouter();
    const { uuid } = router.query;
    const [paragraphData, setParagraphData] = useState([]);
    const [paragraphs, setParagraphs] = useState([]);

    useEffect(() => {
        const localStorageData = localStorage.getItem('sessions');
        if (localStorageData) {
            const data = JSON.parse(localStorageData)[uuid]?.values || [];
            const paragraphs = data.map((p) => p.original);
            setParagraphData(data);
            setParagraphs(paragraphs);
        }
    }, [uuid]);

    if (!paragraphData || !paragraphs) {
        return <div>Loading...</div>;
    }

    return <DisplayPage paragraphData={paragraphData} paragraphs={paragraphs} questions={questions} />;
}

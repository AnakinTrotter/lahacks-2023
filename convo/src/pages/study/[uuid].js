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
        const fetchData = async () => {
            const localStorageData = localStorage.getItem('sessions');
            if (localStorageData) {
                const data = JSON.parse(localStorageData)[uuid]?.values || [];
                const paragraphs = data.map((p) => p.original);
                setParagraphs(paragraphs);

                for (const cur of data) {
                    if (!cur.questions) {

                    }
                }
                setParagraphData(data);
            }
        };
        fetchData();
    }, [uuid]);

    if (!paragraphData || !paragraphs) {
        return <div>Loading...</div>;
    }

    return <DisplayPage uuid={uuid} paragraphData={paragraphData} paragraphs={paragraphs} questions={questions} />;
}

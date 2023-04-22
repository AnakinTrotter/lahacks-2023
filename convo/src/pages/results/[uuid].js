import StudyMastery from "@/components/StudyMastery"
import StudyDisplay from "@/components/StudyDisplay";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
const questions = ["what is the capital of poland", "i hate school", "a", "b", "c", "d"]

export default function Results({ data }) {
    const router = useRouter();
    const { uuid } = router.query;
    const [paragraphData, setParagraphData] = useState([]);
    const [paragraphs, setParagraphs] = useState([]);
    const [percent, setPercent] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const localStorageData = localStorage.getItem('sessions');
            if (localStorageData) {
                const data = JSON.parse(localStorageData)[uuid]?.values || [];
                const paragraphs = data.map((p) => p.original);
                const percent = localStorage.getItem('percent');
                setParagraphs(paragraphs);
                setParagraphData(data);
                setPercent(percent)
            }
        };
        fetchData();
    }, [uuid]);

    // if (!paragraphData || !paragraphs) {
    //     return <div>Loading...</div>;
    // }

    return <StudyDisplay uuid={uuid} insights = {paragraphs} percent = {percent} paragraphs = {paragraphs}/>;
}

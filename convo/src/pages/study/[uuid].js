import DisplayPage from "@/components/DisplayPage"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Study({ data }) {
    const router = useRouter();
    const { uuid } = router.query;
    const [paragraphData, setParagraphData] = useState([]);
    const [paragraphs, setParagraphs] = useState([]);
    const [questionsData, setQuestionsData] = useState([]);

    const fetchData = async () => {
        const localStorageData = localStorage.getItem('sessions');
        if (localStorageData) {
            const data = JSON.parse(localStorageData)[uuid]?.values || [];
            const paragraphs = data.map((p) => p.original);
            console.log(paragraphs);
            let preferences = "no preferences";
            if(localStorage.getItem("profile") != null){
                preferences = localStorage.getItem("profile");
            }
            setParagraphs(paragraphs);
            const responseParagraphs = await fetch('/api/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profile: preferences,
                    paragraphs: paragraphs
                })
            });

            const responseParagraphsData = await responseParagraphs.json()
            console.log(responseParagraphsData)
            for (const index in data) {
                const cur = data[index];
                if (!cur.questions) {
                    const response = await fetch('/api/chatquery', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            paragraph: cur.original
                        })
                    });

                    const questions = await response.json();

                    // Update the cur object with questions
                    cur.questions = questions.questions;
                    setQuestionsData((prev) => [...prev, cur.questions])
                    // Update the data array with updated cur object
                    data[index] = cur;
                    // Save the updated data to local storage
                    const sessions = JSON.parse(localStorage.getItem('sessions')) || {};
                    sessions[uuid] = { values: data };
                    localStorage.setItem('sessions', JSON.stringify(sessions));
                } else {
                    setQuestionsData((prev) => [...prev, cur.questions])
                }
            }
            setParagraphData(responseParagraphsData);
        }

    };

    useEffect(() => {
        fetchData();
    }, [uuid]);

    if (paragraphData.length === 0 || paragraphs.length === 0 || questionsData.length === 0) {
        return <div>Loading...</div>;
    }

    return <DisplayPage uuid={uuid} paragraphData={paragraphData} paragraphs={paragraphs} questions={questionsData} />;
}

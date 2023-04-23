import QuizDisplay from "@/components/QuizDisplay"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const quizQuestions = [
    {
      question: "What is the capital of France?",
      answers: [
        { content: "London", isCorrect: false },
        { content: "Paris", isCorrect: true },
        { content: "Berlin", isCorrect: false },
        { content: "Rome", isCorrect: false }
      ]
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { content: "Jupiter", isCorrect: true },
        { content: "Saturn", isCorrect: false },
        { content: "Mars", isCorrect: false },
        { content: "Earth", isCorrect: false }
      ]
    },
    {
      question: "What is the name of the longest river in Africa?",
      answers: [
        { content: "Nile", isCorrect: true },
        { content: "Amazon", isCorrect: false },
        { content: "Yangtze", isCorrect: false },
        { content: "Mississippi", isCorrect: false },
      ]
    }
  ];
export default function QuizPage({ data }) {

    // const response = await fetch('/api/quizquery', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         paragraph: cur.original
    //     })
    // });

    // const questions = await response.json();

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
                const questions = quizQuestions;
                setParagraphs(paragraphs);
                setParagraphData(data);
            }
        };
        fetchData();
    }, [uuid]);

    // if (!paragraphData || !paragraphs) {
    //     return <div>Loading...</div>;
    // }

    return <QuizDisplay uuid={uuid} paragraphs = {paragraphs} questions = {quizQuestions}/>;
}

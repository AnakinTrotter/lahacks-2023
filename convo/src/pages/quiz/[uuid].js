import QuizDisplay from "@/components/QuizDisplay"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const quizDummyQuestions = [
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

  const router = useRouter();
  const { uuid } = router.query;
  const [paragraphs, setParagraphs] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const localStorageData = localStorage.getItem('sessions');
      if (localStorageData) {
        const data = JSON.parse(localStorageData)[uuid]?.values || [];
        const paragraphs = data.map((p) => p.original);

        const response = await fetch('/api/quizquery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // passage: localStorage.getItem('fullPassage')
            passage: localStorage.getItem('fullPassage')
          })
        });

        const questions = await response.json();
        console.log("SHEE " + questions)
        setQuizQuestions(JSON.parse(questions))
        setParagraphs(paragraphs);
      }
    };
    fetchData();
  }, [uuid]);

  if (!paragraphs || !quizQuestions || paragraphs.length == 0 || quizQuestions.length == 0) {
    return <div>Loading...</div>;
  }

  return <QuizDisplay uuid={uuid} paragraphs={paragraphs} questions={quizQuestions} />;
}

import { Configuration, OpenAIApi } from "openai";

const quizPrompt = (passage) => {
  return `
Your job is to take a passage and generate one multiple choice question about the content of the passage. Your response should be an array with a json object for each question. The object should have a question property and an answers  property. The answer property should store an array. The correct answer should be in the beginning of the answer array.

Sample output:

[
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
]

Create one multiple choice questions for the following passage. Please output only the JSON array and nothing else.
${passage}  
`
}

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.GPT_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: quizPrompt(req.body.passage)
      }
    ],
    max_tokens: 1024
  });

  const ans = completion.data.choices[0].message.content

  res.status(200).json(ans);
}




// export default async function handler(req, res) {
//   const ans = [{
//     question: "What is the capital of France?",
//     answers: [
//       { content: "London", isCorrect: false },
//       { content: "Paris", isCorrect: true },
//       { content: "Berlin", isCorrect: false },
//       { content: "Rome", isCorrect: false }
//     ]
//   },
//     {
//       question: "What is the largest planet in our solar system?",
//       answers: [
//         { content: "Jupiter", isCorrect: true },
//         { content: "Saturn", isCorrect: false },
//         { content: "Mars", isCorrect: false },
//         { content: "Earth", isCorrect: false }
//       ]
//     },
//     {
//       question: "What is the name of the longest river in Africa?",
//       answers: [
//         { content: "Nile", isCorrect: true },
//         { content: "Amazon", isCorrect: false },
//         { content: "Yangtze", isCorrect: false },
//         { content: "Mississippi", isCorrect: false },
//       ]
//     }]

//   res.status(200).json(ans);
// }

import { Configuration, OpenAIApi } from "openai";

const quizPrompt = (passage) => {
  return `
Your task is to generate multiple choice questions. Format your answer as a JSON like so:
{ question: "The passage most strongly suggests that researchers at the Martin Prosperity Institute share which assumption?", answers: [ { "Employees who work from home are more valuable to their employers than employees who commute.", isCorrect: false }, { " Employees whose commutes are shortened will use the time saved to do additional productive work for their employers.", isCorrect: true }, {" Employees can conduct business activities, such as composing memos or joining conference calls, while commuting.", isCorrect: false }, { " Employees who have longer commutes tend to make more money than employees who have shorter commutes.", isCorrect: false } ] }

${passage}

Generate five quiz questions for the above passage that each have three wrong answers and one right answer.
`
}

export default async function handler(req, res) {
  // const configuration = new Configuration({
  //   apiKey: process.env.GPT_API_KEY,
  // });

  // const openai = new OpenAIApi(configuration);

  // const completion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: quizPrompt(req.body.passage),
  //   max_tokens: 1024
  // });


  // const ans = completion.data.choices[0].text

  const ans = [{
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
    }]

  res.status(200).json(ans);
}
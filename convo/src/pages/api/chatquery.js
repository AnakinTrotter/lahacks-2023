// return a few questions delimited by ~
import { Configuration, OpenAIApi } from "openai";

const chatPrompt = (input) => {
  return `
I am going to give you a paragraph and I want you to create two questions about the contents of the paragraph.


Output format should be as such:
{question 1}
{question 2}


Begin First Example:


Input:
The auto-dependent transportation system has reached its limit in most major cities and megaregions. Commuting by car is among the least efficient of all our activities—not to mention among the least enjoyable, according to detailed research by the Nobel Prize–winning economist Daniel Kahneman and his colleagues. Though one might think that the economic crisis beginning in 2007 would have reduced traffic (high unemployment means fewer workers traveling to and from work), the opposite has been true. 


Output: What are the negatives of commuting by car?


End First Example


Begin Second Example
Input:
The auto-dependent transportation system has reached its
limit in most major cities and megaregions. Commuting by
car is among the least efficient of all our activities—not to
mention among the least enjoyable, according to detailed
research by the Nobel Prize-winning economist Daniel
Kahneman and his colleagues. Though one might think that
the economic crisis beginning in 2007 would have reduced
traffic (high unemployment means fewer workers traveling to
and from work), the opposite has been true.


Output: What research supports the claim that commuting by car is one of the least efficient activities?
What is the overall cost of commuting to the US economy, and how does the Martin Prosperity Institute suggest reducing it?


End First Example


Below is the paragraph that I want you to make two questions about.
${input}
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
        content: chatPrompt(req.body.paragraph)
      }
    ],
    max_tokens: 2048
  });

  console.log(completion.data.choices)

  const ans = completion.data.choices[0].message.content.trim()

  res.status(200).json({ questions: ans.split('\n') });
}









// return a few questions delimited by ~
// import { v4 as uuidv4 } from 'uuid';
// export default async function handler(req, res) {
//   // const response = await fetch('https://api.gpt4.ai/completion', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     'Authorization': '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'
//   //   },
//   //   body: JSON.stringify({
//   //     prompt: 'Hello, world!',
//   //     max_tokens: 50
//   //   })
//   // });

//   const data = {
//     "id": "chatcmpl-abc123",
//     "object": "chat.completion",
//     "created": 1677858242,
//     "model": "gpt-3.5-turbo-0301",
//     "usage": {
//       "prompt_tokens": 13,
//       "completion_tokens": 7,
//       "total_tokens": 20
//     },
//     "choices": [
//       {
//         "message": {
//           "role": "assistant",
//           "content": `\n\nThis is a question ${uuidv4()}!~Here is another question! ${uuidv4()}`
//         },
//         "finish_reason": "stop",
//         "index": 0
//       }
//     ]
//   }
//   //const data = await response.json();

//   const ans = data.choices[0].message.content.trim()

//   res.status(200).json({ questions: ans.split('~') });
// }
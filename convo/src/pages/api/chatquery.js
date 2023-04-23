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

  // console.log("PROMPT " + chatPrompt(req.body.paragraph))

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: chatPrompt(req.body.paragraph),
    max_tokens: 2048
  });

  console.log(completion.data.choices)

  const ans = completion.data.choices[0].text.trim()

  res.status(200).json({ questions: ans.split('\n') });
}

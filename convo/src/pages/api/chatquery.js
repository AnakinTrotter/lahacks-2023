// return a few questions delimited by ~
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  console.log("pog")
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "generate 2 words separated by ~",
  });

  const ans = completion.data.choices[0].text.trim()

  res.status(200).json({ questions: ans.split('~') });
}

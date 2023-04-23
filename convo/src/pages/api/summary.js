// return a few questions delimited by ~
import { Configuration, OpenAIApi } from "openai";

const summaryPrompt = (prefs, paragraphs) => {
    return `
Based on the users preferences: ${prefs};
please rephrase this array of paragraphs and return it as an array of strings with the same number of indexes:

${paragraphs}

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
                content: summaryPrompt(req.body.profile, req.body.paragraphs)
            }
        ],
        max_tokens: 2048
    });
    console.log("PROMPT: " + summaryPrompt(req.body.profile, req.body.paragraphs) )
    // console.log(JSON.stringify(completion.data.choices) + "POG")

    const ans = completion.data.choices[0].message.content.trim()
    console.log(ans + " QQQ")
    res.status(200).json(ans);
}

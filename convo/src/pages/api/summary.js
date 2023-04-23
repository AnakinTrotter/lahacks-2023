// return a few questions delimited by ~
import { Configuration, OpenAIApi } from "openai";

const summaryPrompt = (prefs, paragraphs) => {
    return `

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

    // console.log(completion.data.choices)

    const ans = completion.data.choices[0].message.content.trim()

    res.status(200).json(ans);
}

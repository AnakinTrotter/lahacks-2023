// return a few questions delimited by ~
import crypto from "crypto"
export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: "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",
  });

  // console.log("PROMPT " + chatPrompt(req.body.paragraph))

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: chatPrompt(req.body.paragraph),
    max_tokens: 2048
  });

  const data = {
    "id": "chatcmpl-abc123",
    "object": "chat.completion",
    "created": 1677858242,
    "model": "gpt-3.5-turbo-0301",
    "usage": {
      "prompt_tokens": 13,
      "completion_tokens": 7,
      "total_tokens": 20
    },
    "choices": [
      {
        "message": {
          "role": "assistant",
          "content": `\n\nThis is a question ${crypto.randomUUID()}!~Here is another question! ${crypto.randomUUID()}`
        },
        "finish_reason": "stop",
        "index": 0
      }
    ]
  }
  //const data = await response.json();

  const ans = completion.data.choices[0].text.trim()

  res.status(200).json({ questions: ans.split('\n') });
}

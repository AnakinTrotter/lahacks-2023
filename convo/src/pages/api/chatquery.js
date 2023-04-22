// return a few questions delimited by ~
export default async function handler(req, res) {
  // const response = await fetch('https://api.gpt4.ai/completion', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': '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'
  //   },
  //   body: JSON.stringify({
  //     prompt: 'Hello, world!',
  //     max_tokens: 50
  //   })
  // });

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

  const ans = data.choices[0].message.content.trim()

  res.status(200).json({ questions: ans.split('~') });
}

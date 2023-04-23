export default async function handler(req, res) {
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
          "content": `\n\nThis is a question ${uuidv4()}!~Here is another question! ${crypto.uuidv4()}`
        },
        "finish_reason": "stop",
        "index": 0
      }
    ]
  }

  const ans = data.choices[0].message.content.trim()

  res.status(200).json({ questions: ans.split('~') });
}
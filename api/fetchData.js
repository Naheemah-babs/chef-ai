// api/fetchData.js (server-side, root folder)
import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe...
`;

const hf = new InferenceClient(process.env.API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredientsArr } = req.body;

  if (!ingredientsArr || !Array.isArray(ingredientsArr)) {
    return res.status(400).json({ error: "Invalid ingredients" });
  }

  try {
    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsArr.join(", ")}` },
      ],
      max_tokens: 1024,
    });

    res.status(200).json({
      recipe: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
}

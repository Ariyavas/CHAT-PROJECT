import { Configuration, OpenAIApi } from "openai";
import { showQuestionAndAnswer } from "./Service_Qa";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const RESAIFAQS = async (message: string) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: await generatePrompt(message),
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n"],
    });

    return response.data.choices[0].text;
  } catch (error) {
    throw error;
  }
};

const generatePrompt = async (message: string) => {
  const capitalizedAnimal =
    message[0].toUpperCase() + message.slice(1).toLowerCase();

  const data = await showQuestionAndAnswer();
  let text = "";

  data.map((item: any) => {
    text += `\n\nQ:${item.Q}\nA:${item.A}`;
  });

  return `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".${text}\n\nQ: ${capitalizedAnimal}\nA:`;
};

export { RESAIFAQS };

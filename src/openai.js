import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true, // required for frontend
});
// console.log("API KEY:", process.env.REACT_APP_OPENAI_KEY);

export async function sendMsgToOpenAI(message) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    if (error.status === 429) {
      return "Rate limit exceeded. Please wait and try again later.";
    }
    throw error;
  }
}


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateDevotional() {
  try {

    console.log('Api token', process.env.OPENAI_API_KEY.substring(5,2));
    const prompt = 'generate a biblic devotional about a random bible passage of the new testament in brazilian portuguese that is equal to any sermon of jonathan edwards and end this short devotional with a guided prayer to God';

    const temperature = 0.5;
    const max_tokens = 1024;
    const n = 1;
    const openaiCompletionEngine = 'text-davinci-003';

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature,
        max_tokens,
      });

    return response.data.choices[0].text
  } catch (ex) {
    console.error('while getting devotional an error happened ', ex.message)
  }
}

module.exports = {
  generateDevotional
}
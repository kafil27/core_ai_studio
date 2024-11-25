// services/api/openai.js

// Import Axios for making HTTP requests
import axios from 'axios';

// Your OpenAI API key
const openaiApiKey = 'your-openai-api-key';

// Function to generate text using OpenAI API
export const generateText = async (prompt) => {
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt, // The prompt to generate text from
    max_tokens: 100 // Maximum number of tokens in the generated text
  }, {
    headers: {
      'Authorization': `Bearer ${openaiApiKey}` // Authorization header with your API key
    }
  });
  return response.data.choices[0].text; // Return the generated text
};

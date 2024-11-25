// services/api/deepai.js

// Import Axios for making HTTP requests
import axios from 'axios';

// Your DeepAI API key
const deepaiApiKey = 'your-deepai-api-key';

// Function to generate an image using DeepAI API
export const generateImage = async (prompt) => {
  const response = await axios.post('https://api.deepai.org/api/text2img', {
    text: prompt // The prompt to generate an image from
  }, {
    headers: {
      'Api-Key': deepaiApiKey // Authorization header with your API key
    }
  });
  return response.data.output_url; // Return the generated image URL
};

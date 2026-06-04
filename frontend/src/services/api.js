import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const generateAIInsights = async (data) => {
  const prompt = `You are a data analyst for a retail CRM platform.
Analyze this customer data and generate business insights:
Data: ${JSON.stringify(data)}

Return 3 short, actionable insights a marketing manager would care about.
Respond ONLY in JSON format like this:
{
  "insights": [
    {
      "title": "...",
      "description": "...",
      "action": "..."
    }
  ]
}`;

  const response = await axios.post(`${API_URL}/ai`, { prompt });
  return response.data;
};

export const generateCampaignSuggestions = async (segment, industry, goal) => {
  const prompt = `You are an AI marketing assistant for a CRM platform.
A brand wants to run a campaign with the following details:
- Target Segment: ${segment}
- Industry: ${industry}
- Goal: ${goal}

Generate 3 campaign message suggestions. For each suggestion provide:
- Subject Line
- Short Message (max 2 lines, SMS friendly)
- Best time to send

Respond ONLY in JSON format like this:
{
  "campaigns": [
    {
      "subject": "...",
      "message": "...",
      "best_time": "..."
    }
  ]
}`;

  const response = await axios.post(`${API_URL}/ai`, { prompt });
  return response.data;
};

export const chatWithData = async (question, data) => {
  const prompt = `You are a CRM data assistant. You have access to the following customer engagement data:
${JSON.stringify(data)}

The user will ask questions about this data.
Answer in 2-3 lines maximum, in simple business language.
Do not make up data that isn't provided.
User question: ${question}`;

  const response = await axios.post(`${API_URL}/ai`, { prompt });
  return response.data;
};

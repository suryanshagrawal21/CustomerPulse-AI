require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generic endpoint for handling AI requests
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt, system } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    let fullPrompt = prompt;
    if (system) {
      fullPrompt = `System instructions: ${system}\n\nUser request: ${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    const responseText = response.text;
    
    // Attempt to parse JSON if it's expected
    try {
      // In case Gemini returns JSON wrapped in markdown code blocks
      const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const jsonResponse = JSON.parse(cleanedText);
      return res.json(jsonResponse);
    } catch (parseError) {
      // If it's not JSON, return as text
      return res.json({ text: responseText });
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

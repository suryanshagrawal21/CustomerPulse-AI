# ⚡ CustomerPulse AI

![CustomerPulse AI Banner](https://via.placeholder.com/1200x300/4F46E5/FFFFFF?text=CustomerPulse+AI+-+AI-Powered+CRM)

> An intelligent, AI-powered Customer Engagement Dashboard built to empower marketing teams with data-driven insights and automated campaign generation.

CustomerPulse AI is a modern CRM dashboard that goes beyond static data. By integrating with Google's cutting-edge **Gemini 2.5 Flash AI**, it automatically analyzes customer data to generate actionable business insights, builds tailored marketing campaigns on the fly, and allows users to query their database using natural language.

---

## ✨ Key Features

- **📊 AI Business Insights:** Automatically analyzes revenue trends and customer metrics to provide actionable, plain-english business recommendations.
- **🎯 Smart Campaign Builder:** Input a target segment, industry, and goal, and the AI generates complete SMS/Email campaigns (Subject, Message, and Best Time to Send). Includes a built-in Campaign History tracking table.
- **💬 Ask Data (AI Chatbot):** A natural language interface to query CRM data. Users can ask questions like *"Which segment generates highest revenue?"* and get immediate, contextual answers.
- **🌓 Dark Mode Support:** A beautifully crafted, seamless dark mode UI that respects user preferences.
- **📈 Interactive Analytics:** Built with Recharts for responsive, dynamic visualizations of Revenue Trends, Customer Growth, and Campaign Performance.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Routing:** React Router DOM

### Backend
- **Environment:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **AI Integration:** [@google/genai](https://github.com/google/genai-node) (Gemini 2.5 Flash API)
- **Middleware:** CORS, Express JSON

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Gemini API Key (Get one from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the repository

```bash
git clone https://github.com/suryanshagrawal21/CustomerPulse-AI.git
cd CustomerPulse-AI
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your API key:
```env
# backend/.env
GEMINI_API_KEY="your_api_key_here"
```

Start the backend server:
```bash
node server.js
# The server will run on http://localhost:5001
```

### 3. Setup the Frontend

Open a new terminal window:
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
# The app will run on http://localhost:5173
```

---

## 📁 Project Structure

```text
CustomerPulse-AI/
├── backend/                  # Express server for AI integration
│   ├── server.js             # API routes and Gemini setup
│   └── package.json          
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI (Layout, Sidebar, etc.)
│   │   ├── pages/            # Dashboard, CampaignBuilder, Chatbot, Customers
│   │   ├── services/         # API calls (api.js)
│   │   ├── data/             # Mock data (mockData.js)
│   │   ├── App.jsx           # Main routing setup
│   │   └── index.css         # Tailwind and Dark Mode configs
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

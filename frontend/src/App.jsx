import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CampaignBuilder from './pages/CampaignBuilder';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/campaigns" element={<CampaignBuilder />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

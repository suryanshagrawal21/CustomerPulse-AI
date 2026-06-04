import { useState } from 'react';
import { generateCampaignSuggestions } from '../services/api';
import { Loader2, Send, Clock, AlertCircle } from 'lucide-react';

export default function CampaignBuilder() {
  const [formData, setFormData] = useState({
    segment: 'VIP',
    industry: 'Fashion',
    goal: 'Increase repeat purchases'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCampaigns([]);

    try {
      const response = await generateCampaignSuggestions(
        formData.segment,
        formData.industry,
        formData.goal
      );
      
      if (response && response.campaigns) {
        setCampaigns(response.campaigns);
      } else {
        throw new Error("Invalid response format from AI");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to generate campaigns. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900">AI Campaign Builder</h2>
          <p className="text-gray-500 mt-1 text-sm">Generate tailored messaging for your target audience</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Segment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Segment
                </label>
                <select
                  name="segment"
                  value={formData.segment}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white px-4 py-2.5 border"
                >
                  <option value="VIP">VIP</option>
                  <option value="Loyal">Loyal</option>
                  <option value="New">New</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white px-4 py-2.5 border"
                >
                  <option value="Fashion">Fashion</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Software">Software</option>
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal
                </label>
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2.5 border"
                  placeholder="e.g. Re-engage inactive users"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Campaigns
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">API Failed</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {campaigns.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Generated Suggestions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((campaign, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-indigo-100 hover:border-indigo-300 transition-colors overflow-hidden group">
                <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                  <h4 className="font-bold text-indigo-900 line-clamp-1">{campaign.subject}</h4>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-gray-700 italic">
                    "{campaign.message}"
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-500 bg-white">
                    <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                    Best Time: <span className="ml-1 text-gray-900">{campaign.best_time}</span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                  <button className="w-full text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors">
                    Use This Message &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

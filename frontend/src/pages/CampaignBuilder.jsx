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
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Campaign Builder</h2>
          <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">Generate tailored messaging for your target audience</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Segment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Target Segment
                </label>
                <select
                  name="segment"
                  value={formData.segment}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-white px-4 py-2.5 border"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-white px-4 py-2.5 border"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Goal
                </label>
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2.5 border"
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
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Generated Suggestions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((campaign, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors overflow-hidden group">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 px-6 py-4 border-b border-indigo-100 dark:border-indigo-900/50">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300">Campaign {idx + 1}</h4>
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-slate-400 font-medium block mb-1">Subject:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{campaign.subject}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-slate-400 font-medium block mb-1">Message:</span>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-slate-300 italic">
                      "{campaign.message}"
                    </div>
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 pt-2">
                    <Clock className="w-4 h-4 mr-2 text-indigo-400 dark:text-indigo-500" />
                    Best Time: <span className="ml-1 text-gray-900 dark:text-white">{campaign.best_time}</span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800">
                  <button className="w-full text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                    Use This Message &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaign History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Campaign History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-slate-400">
            <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 font-medium border-b border-gray-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Campaign</th>
                <th className="px-6 py-4">Segment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Open Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Welcome Series</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800">New</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800">Active</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">60%</td>
              </tr>
              <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">VIP Rewards</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-800">VIP</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-300 border border-gray-200 dark:border-slate-700">Completed</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">48%</td>
              </tr>
              <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Win Back</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800">At Risk</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Scheduled</span>
                </td>
                <td className="px-6 py-4 text-gray-400 dark:text-slate-500">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

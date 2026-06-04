import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Users, Megaphone, DollarSign, Activity, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { mockRevenueData, mockGrowthData, mockCampaignPerformance, dashboardSummary } from '../data/mockData';
import { generateAIInsights } from '../services/api';

export default function Dashboard() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = {
        summary: dashboardSummary,
        revenue: mockRevenueData.slice(-3), // last 3 months
        campaigns: mockCampaignPerformance
      };
      const response = await generateAIInsights(data);
      if (response && response.insights) {
        setInsights(response.insights);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Unable to generate insights. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const formatCurrency = (value) => `₹${(value / 100000).toFixed(1)}L`;

  return (
    <div className="space-y-6">
      {/* Analytics Summary Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Customers</p>
            <h3 className="text-2xl font-bold text-gray-900">{dashboardSummary.totalCustomers.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Campaigns</p>
            <h3 className="text-2xl font-bold text-gray-900">{dashboardSummary.activeCampaigns}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardSummary.revenue)}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Retention Rate</p>
            <h3 className="text-2xl font-bold text-gray-900">{dashboardSummary.retentionRate}%</h3>
          </div>
        </div>
      </div>

      {/* AI Insights Widget */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-indigo-300" />
            </div>
            <h2 className="text-xl font-bold">AI Business Insights</h2>
          </div>
          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm font-medium backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
            <span>{loading ? 'Analyzing...' : 'Refresh Insights'}</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg flex items-start space-x-3 text-red-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5 animate-pulse h-32"></div>
              ))
            ) : insights.length > 0 ? (
              insights.map((insight, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-colors group">
                  <h4 className="font-semibold text-indigo-200 mb-2 group-hover:text-indigo-100">{insight.title}</h4>
                  <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
                  <div className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                    Action: {insight.action}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No insights available.</p>
            )}
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Customer Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Performance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Campaign Performance (%)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCampaignPerformance} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="openRate" name="Open Rate" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="clickRate" name="Click Rate" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

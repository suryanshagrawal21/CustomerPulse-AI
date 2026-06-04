import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, AreaChart, Area, Legend
} from 'recharts';
import { Users, Megaphone, DollarSign, Activity, Sparkles, Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import { mockRevenueData, mockGrowthData, mockCampaignPerformance, dashboardSummary } from '../data/mockData';
import { generateAIInsights } from '../services/api';

// Static fallback insights derived from mock data — always shown if AI is unavailable
const FALLBACK_INSIGHTS = [
  {
    title: "Revenue Up 112% YoY",
    description: "Revenue climbed from ₹40k in Jan to ₹85k in Dec. The Q4 surge driven by festive campaigns is a strong trend to replicate in the next cycle.",
    action: "Scale Q4 campaigns 2 months early"
  },
  {
    title: "Welcome Series is #1",
    description: "Welcome Series leads with 60% open rate and 25% click rate — far above the industry average of 20% open. This is your highest-performing campaign.",
    action: "Apply Welcome Series tactics to Win-back"
  },
  {
    title: "At-Risk Segment Alert",
    description: "2 customers (Diana, Hannah) are inactive for 7+ months with ₹10,000 combined spend at risk. Immediate re-engagement can recover this revenue.",
    action: "Launch targeted win-back campaign now"
  }
];

export default function Dashboard() {
  const [insights, setInsights] = useState(FALLBACK_INSIGHTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);
    try {
      const data = {
        summary: dashboardSummary,
        revenue: mockRevenueData.slice(-3),
        campaigns: mockCampaignPerformance
      };
      const response = await generateAIInsights(data);
      if (response && response.insights) {
        setInsights(response.insights);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error(err);
      // Use fallback insights instead of showing error to user
      setInsights(FALLBACK_INSIGHTS);
      setUsingFallback(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const formatCurrency = (value) => `₹${(value / 100000).toFixed(1)}L`;

  const kpiCards = [
    {
      label: 'Total Customers',
      value: dashboardSummary.totalCustomers.toLocaleString(),
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      border: 'border-l-blue-500',
    },
    {
      label: 'Active Campaigns',
      value: dashboardSummary.activeCampaigns,
      icon: Megaphone,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      border: 'border-l-purple-500',
    },
    {
      label: 'Revenue',
      value: formatCurrency(dashboardSummary.revenue),
      icon: DollarSign,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      border: 'border-l-green-500',
    },
    {
      label: 'Retention Rate',
      value: `${dashboardSummary.retentionRate}%`,
      icon: Activity,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      border: 'border-l-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={`bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 border-l-4 ${card.border} flex items-center space-x-4 hover:shadow-md transition-shadow duration-200 cursor-default`}
          >
            <div className={`p-3 ${card.iconBg} dark:bg-slate-800 ${card.iconColor} rounded-lg flex-shrink-0`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{card.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Widget */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Business Insights</h2>
              {usingFallback && (
                <p className="text-xs text-indigo-300 mt-0.5">Showing data-driven insights from your CRM data</p>
              )}
            </div>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm font-medium backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
            <span>{loading ? 'Analyzing...' : 'Refresh Insights'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5 animate-pulse h-32" />
            ))
          ) : (
            insights.map((insight, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-colors group">
                <h4 className="font-semibold text-indigo-200 mb-2 group-hover:text-indigo-100">{insight.title}</h4>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">{insight.description}</p>
                <div className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                  ✦ {insight.action}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} dx={-4} tickFormatter={(v) => `₹${v / 1000}k`} width={48} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Growth */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Customer Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGrowthData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} dx={-4} width={48} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Performance — full width */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 lg:col-span-2 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Campaign Performance (%)</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet-500 inline-block" /> Open Rate</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Click Rate</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCampaignPerformance} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} dx={-4} width={36} />
                <Tooltip
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="openRate" name="Open Rate" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="clickRate" name="Click Rate" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

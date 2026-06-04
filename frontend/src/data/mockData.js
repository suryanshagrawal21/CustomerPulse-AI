export const mockCustomers = [
  { id: 1, name: "Alice Johnson", segment: "VIP", totalSpend: 12500, lastPurchase: "2023-10-15", status: "Active" },
  { id: 2, name: "Bob Smith", segment: "Loyal", totalSpend: 8400, lastPurchase: "2023-11-02", status: "Active" },
  { id: 3, name: "Charlie Brown", segment: "New", totalSpend: 300, lastPurchase: "2023-12-01", status: "Active" },
  { id: 4, name: "Diana Prince", segment: "At Risk", totalSpend: 5200, lastPurchase: "2023-04-20", status: "Inactive" },
  { id: 5, name: "Evan Wright", segment: "VIP", totalSpend: 15600, lastPurchase: "2023-11-28", status: "Active" },
  { id: 6, name: "Fiona Gallagher", segment: "Loyal", totalSpend: 9100, lastPurchase: "2023-10-05", status: "Active" },
  { id: 7, name: "George Miller", segment: "New", totalSpend: 150, lastPurchase: "2023-12-10", status: "Active" },
  { id: 8, name: "Hannah Abbott", segment: "At Risk", totalSpend: 4800, lastPurchase: "2023-02-15", status: "Inactive" },
];

export const mockRevenueData = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 42000 },
  { month: "Apr", revenue: 50000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 60000 },
  { month: "Jul", revenue: 58000 },
  { month: "Aug", revenue: 65000 },
  { month: "Sep", revenue: 70000 },
  { month: "Oct", revenue: 68000 },
  { month: "Nov", revenue: 75000 },
  { month: "Dec", revenue: 85000 },
];

export const mockGrowthData = [
  { month: "Jan", customers: 1000 },
  { month: "Mar", customers: 1200 },
  { month: "May", customers: 1500 },
  { month: "Jul", customers: 2000 },
  { month: "Sep", customers: 2800 },
  { month: "Nov", customers: 3500 },
];

export const mockCampaignPerformance = [
  { name: "Summer Sale", openRate: 45, clickRate: 12 },
  { name: "Welcome Series", openRate: 60, clickRate: 25 },
  { name: "Win-back", openRate: 20, clickRate: 5 },
  { name: "VIP Exclusive", openRate: 55, clickRate: 18 },
];

export const dashboardSummary = {
  totalCustomers: 12450,
  activeCampaigns: 18,
  revenue: 1240000,
  retentionRate: 72
};

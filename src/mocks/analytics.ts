export interface AnalyticsSnapshot {
  tenantId: string;
  billableHoursThisMonth: number;
  totalIncomeYearToDate: number;
  activeMattersCount: number;
  unbilledHours: number;
}

export const MOCK_ANALYTICS: Record<string, AnalyticsSnapshot> = {
  "oakwood-llp": {
    tenantId: "oakwood-llp",
    billableHoursThisMonth: 342.5,
    totalIncomeYearToDate: 840900.00,
    activeMattersCount: 34,
    unbilledHours: 124.8
  },
  "verma-partners": {
    tenantId: "verma-partners",
    billableHoursThisMonth: 189.0,
    totalIncomeYearToDate: 490200.00,
    activeMattersCount: 12,
    unbilledHours: 45.0
  }
};

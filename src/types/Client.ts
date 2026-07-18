export interface Client {
  id: string;
  tenantId: string;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Prospect";
  onboardingDate: string;
}

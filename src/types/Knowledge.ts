export interface Article {
  id: string;
  tenantId: string;
  title: string;
  category: "Legal_Precedents" | "Local_Court_Rules" | "Internal_Procedures" | "Research";
  content: string;
  author: string;
  lastUpdated: string;
}

import { Invoice, Payment } from "@/types";

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-stark-01",
    tenantId: "oakwood-llp",
    clientId: "client-stark",
    caseId: "case-acme",
    invoiceNumber: "INV-2026-0098",
    amount: 145000,
    amountPaid: 145000,
    status: "Paid",
    issueDate: "2026-05-01",
    dueDate: "2026-06-01"
  },
  {
    id: "inv-wayne-01",
    tenantId: "oakwood-llp",
    clientId: "client-wayne",
    caseId: "case-wayne-tax",
    invoiceNumber: "INV-2026-0145",
    amount: 8500.00,
    amountPaid: 0,
    status: "Sent",
    issueDate: "2026-07-02",
    dueDate: "2026-08-01"
  },
  {
    id: "inv-wayne-02",
    tenantId: "oakwood-llp",
    clientId: "client-wayne",
    caseId: "case-wayne-tax",
    invoiceNumber: "INV-2026-0044",
    amount: 3950.00,
    amountPaid: 0,
    status: "Overdue",
    issueDate: "2026-06-15",
    dueDate: "2026-07-15"
  }
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-stark-01",
    tenantId: "oakwood-llp",
    invoiceId: "inv-stark-01",
    amount: 145000,
    paymentMethod: "Bank_Transfer",
    paymentDate: "2026-05-18",
    transactionReference: "TXN-88402941"
  }
];

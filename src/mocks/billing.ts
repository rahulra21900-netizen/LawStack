import { Invoice, Payment } from "@/types";

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-reliance-01",
    tenantId: "chandra-associates",
    clientId: "client-reliance",
    caseId: "case-reliance-ip",
    invoiceNumber: "INV-2026-0098",
    amount: 1450000,
    amountPaid: 1450000,
    status: "Paid",
    issueDate: "2026-05-01",
    dueDate: "2026-06-01",
  },
  {
    id: "inv-krishna-01",
    tenantId: "chandra-associates",
    clientId: "client-krishna",
    caseId: "case-krishna-tax",
    invoiceNumber: "INV-2026-0145",
    amount: 85000.0,
    amountPaid: 0,
    status: "Sent",
    issueDate: "2026-07-02",
    dueDate: "2026-08-01",
  },
  {
    id: "inv-krishna-02",
    tenantId: "chandra-associates",
    clientId: "client-krishna",
    caseId: "case-krishna-tax",
    invoiceNumber: "INV-2026-0044",
    amount: 39500.0,
    amountPaid: 0,
    status: "Overdue",
    issueDate: "2026-06-15",
    dueDate: "2026-07-15",
  },
  {
    id: "inv-sharma-01",
    tenantId: "chandra-associates",
    clientId: "client-sharma",
    caseId: "case-sharma-bail",
    invoiceNumber: "INV-2026-0170",
    amount: 24500.0,
    amountPaid: 0,
    status: "Sent",
    issueDate: "2026-07-10",
    dueDate: "2026-08-01",
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-reliance-01",
    tenantId: "chandra-associates",
    invoiceId: "inv-reliance-01",
    amount: 1450000,
    paymentMethod: "UPI",
    paymentDate: "2026-05-18",
    transactionReference: "UPI/PAY/RIL/8840294107",
  },
];

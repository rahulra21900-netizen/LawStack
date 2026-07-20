export interface Invoice {
    id: string;
    tenantId: string;
    clientId: string;
    caseId?: string;
    invoiceNumber: string;
    amount: number;
    amountPaid: number;
    status: "Draft" | "Sent" | "Partially_Paid" | "Paid" | "Overdue" | "Void";
    issueDate: string;
    dueDate: string;
  }

  export interface Payment {
    id: string;
    tenantId: string;
    invoiceId: string;
    amount: number;
    paymentMethod: "UPI" | "Razorpay" | "NEFT" | "RTGS" | "Bank_Transfer" | "Cash" | "Cheque" | "Credit_Card";
    paymentDate: string;
    transactionReference: string;
  }

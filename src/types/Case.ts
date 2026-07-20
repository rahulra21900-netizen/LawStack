export interface Case {
  id: string;
  tenantId: string;
  clientId: string;
  title: string;
  caseNumber: string;
  cnr?: string;
  court?: string;
  practiceArea: string;
  stage: "Pleadings" | "Discovery" | "Pre-Trial" | "Trial" | "Appeal" | "Closed";
  status: "Active" | "Archived" | "Pending";
  leadCounsel: string;
  openDate: string;
  closeDate?: string;
  nextHearingDate?: string;
  hearingPurpose?: string;
  urgencyLevel?: "Normal" | "Urgent" | "Critical";
  scheduleAlert?: string;
  hasClash?: boolean;
  clashingCounsel?: string;
  appliedSection?: string;
  suggestedSection?: string;
  officialVersion?: string;
}

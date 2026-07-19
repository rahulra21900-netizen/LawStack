export interface ProvisioningCredentialInput {
  barNumber?: string;
  stateBar?: string;
  gstNum?: string;
  panNum?: string;
}

export interface ProvisioningVerificationResult {
  verified: boolean;
  errors: {
    barNumber: string;
    stateBar: string;
    gstNum: string;
    panNum: string;
  };
}

export const ProvisioningService = {
  async verifyCredentials(input: ProvisioningCredentialInput): Promise<ProvisioningVerificationResult> {
    const errors = {
      barNumber: "",
      stateBar: "",
      gstNum: "",
      panNum: "",
    };

    const barValue = (input.barNumber ?? "").trim().toUpperCase();
    if (!barValue) {
      errors.barNumber = "Bar council registration number is required.";
    } else if (!/^[A-Z0-9/.-]{3,20}$/.test(barValue)) {
      errors.barNumber = "Enter a valid bar council registration number.";
    }

    const stateValue = (input.stateBar ?? "").trim();
    if (!stateValue) {
      errors.stateBar = "State bar council is required.";
    }

    const gstValue = (input.gstNum ?? "").trim().toUpperCase();
    if (gstValue && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gstValue)) {
      errors.gstNum = "Enter a valid GSTIN number.";
    }

    const panValue = (input.panNum ?? "").trim().toUpperCase();
    if (!panValue) {
      errors.panNum = "PAN number is required.";
    } else if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(panValue)) {
      errors.panNum = "Enter a valid PAN number.";
    }

    return {
      verified: Object.values(errors).every((message) => !message),
      errors,
    };
  },
};

import test from "node:test";
import assert from "node:assert/strict";
import { ProvisioningService } from "./provisioning.service";

test("verifies valid PAN, GSTIN, and bar council credentials", async () => {
  const result = await ProvisioningService.verifyCredentials({
    barNumber: "D/2026/8840",
    stateBar: "Delhi Bar Council",
    gstNum: "07AAAAA1111A1Z1",
    panNum: "ABCDE1234F",
  });

  assert.equal(result.verified, true);
  assert.deepEqual(result.errors, {
    barNumber: "",
    stateBar: "",
    gstNum: "",
    panNum: "",
  });
});

test("returns errors for invalid values", async () => {
  const result = await ProvisioningService.verifyCredentials({
    barNumber: "!!",
    stateBar: "",
    gstNum: "invalid",
    panNum: "abc",
  });

  assert.equal(result.verified, false);
  assert.match(result.errors.barNumber, /valid/i);
  assert.match(result.errors.stateBar, /required/i);
  assert.match(result.errors.gstNum, /valid/i);
  assert.match(result.errors.panNum, /valid/i);
});

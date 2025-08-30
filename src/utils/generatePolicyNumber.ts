import { POLICY_TYPES } from "../constants/policyTypes";

let counters: Record<string, number> = {
  life: 0,
  health: 0,
  motor: 0,
  property: 0,
  crop: 0,
  travel: 0,
};

export function generatePolicyNumber(type: string): string {
  const policyType = POLICY_TYPES.find((t) => t.value === type);
  if (!policyType) return "";

  counters[type] += 1;
  return `${policyType.prefix}${String(counters[type]).padStart(3, "0")}`;
}

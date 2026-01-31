export function evaluateProfile(profile) {
  const data = profile.data;

  let score = 0;

  if (data.gpa && data.gpa >= 7) score += 2;
  if (data.ielts === "Completed") score += 2;
  if (data.gre === "Completed") score += 2;
  if (data.sop === "Ready") score += 2;

  if (score >= 6) return "Strong";
  if (score >= 3) return "Average";
  return "Weak";
}

export function classifyUniversity(profile, university) {
  const budget = profile.data.budget;
  const strength = evaluateProfile(profile);

  if (budget < university.cost) {
    return {
      bucket: "Risky",
      reason: "Cost exceeds your budget"
    };
  }

  if (strength === "Strong" && university.competitiveness === "High") {
    return { bucket: "Dream", reason: "Strong profile but high competition" };
  }

  if (strength === "Average" && university.competitiveness !== "High") {
    return { bucket: "Target", reason: "Balanced match for your profile" };
  }

  return { bucket: "Safe", reason: "Higher acceptance probability" };
}

export function counsellorResponse(profile) {
  const strength = evaluateProfile(profile);

  return {
    message: `Your profile strength is ${strength}. Next step is university shortlisting.`,
    nextAction: "DISCOVER_UNIVERSITIES"
  };
}

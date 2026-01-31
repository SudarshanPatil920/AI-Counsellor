export const evaluateProfile = (profile) => {
  const score =
    (profile.ielts || 0) +
    (profile.gre || 0) +
    (profile.cgpa || 0);

  if (score >= 20) {
    return {
      tier: "HIGH",
      countries: ["USA", "Canada", "UK"],
      reasoning: "Strong academics and language proficiency"
    };
  }

  if (score >= 14) {
    return {
      tier: "MEDIUM",
      countries: ["Germany", "Ireland", "Australia"],
      reasoning: "Decent profile with good improvement scope"
    };
  }

  return {
    tier: "LOW",
    countries: ["Poland", "Hungary", "Lithuania"],
    reasoning: "Profile needs safe and budget-friendly options"
  };
};

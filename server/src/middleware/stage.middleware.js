import { getProfile } from "../models/profile.model.js";

export const requireProfileCompleted = async (req, res, next) => {
  const profile = await getProfile(req.user.id);
  if (!profile || !profile.completed) {
    return res.status(403).json({ message: "Complete onboarding first" });
  }
  next();
};

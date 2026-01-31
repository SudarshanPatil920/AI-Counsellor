import { listUniversities } from "../models/university.model.js";
import { classifyUniversity } from "../services/ai.service.js";
import { getProfile } from "../models/profile.model.js";

export const recommendUniversities = async (req, res, next) => {
  try {
    const profile = await getProfile(req.user.id);
    const universities = await listUniversities();

    const recommendations = universities.map((uni) => {
      const evaluation = classifyUniversity(profile, uni);
      return {
        ...uni,
        category: evaluation.bucket,
        reason: evaluation.reason
      };
    });

    res.json(recommendations);
  } catch (e) {
    next(e);
  }
};

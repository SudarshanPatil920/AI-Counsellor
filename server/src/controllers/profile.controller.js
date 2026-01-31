import { upsertProfile, getProfile } from "../models/profile.model.js";
import { getLockedUniversities } from "../models/university.model.js";

export const saveProfile = async (req, res, next) => {
  try {
    const profile = await upsertProfile(req.user.id, req.body);
    res.json(profile);
  } catch (e) {
    next(e);
  }
};

export const fetchProfile = async (req, res, next) => {
  try {
    const profile = await getProfile(req.user.id);
    res.json(profile);
  } catch (e) {
    next(e);
  }
};

export const getStageStatus = async (req, res, next) => {
  try {
    const profile = await getProfile(req.user.id);
    const locked = await getLockedUniversities(req.user.id);

    let stage = "BUILDING_PROFILE";

    if (profile?.completed) {
      stage = "DISCOVERING_UNIVERSITIES";
    }

    if (locked.length > 0) {
      stage = "PREPARING_APPLICATIONS";
    }

    res.json({
      stage,
      profileCompleted: profile?.completed || false,
      lockedUniversities: locked.length
    });
  } catch (e) {
    next(e);
  }
};

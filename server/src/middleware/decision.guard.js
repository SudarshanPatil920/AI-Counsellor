import { getLockedUniversities } from "../models/university.model.js";

export const preventIfLocked = async (req, res, next) => {
  try {
    const locked = await getLockedUniversities(req.user.id);

    if (locked.length > 0) {
      return res.status(403).json({
        message: "University already locked. Further changes not allowed."
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

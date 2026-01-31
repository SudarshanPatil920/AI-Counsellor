import { counsellorResponse } from "../services/ai.service.js";
import { getProfile } from "../models/profile.model.js";
// import { lockUniversity } from "../models/university.model.js";
import { createTask } from "../models/task.model.js";

export const talkToCounsellor = async (req, res, next) => {
  try {
    const profile = await getProfile(req.user.id);
    const response = counsellorResponse(profile);
    res.json(response);
  } catch (e) {
    next(e);
  }
};

export const lockUniversityAction = async (req, res, next) => {
  try {
    const { universityId } = req.body;

    await lockUniversity(req.user.id, universityId);

    await createTask(req.user.id, "Write Statement of Purpose");
    await createTask(req.user.id, "Prepare academic transcripts");
    await createTask(req.user.id, "Submit university application form");

    res.json({
      message: "University locked. Application tasks generated."
    });
  } catch (e) {
    next(e);
  }
};

import * as authService from "../services/auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await authService.signup(name, email, password);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

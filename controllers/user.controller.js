import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.validatedBody);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message }); 
  }
};

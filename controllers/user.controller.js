export const createUser = async (req, res) => {
  try {
    const user = new User(req.validatedBody);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur.' });
  }
};
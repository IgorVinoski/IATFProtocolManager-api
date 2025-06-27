const userUseCases = require('../usecases/userUseCases');

// @desc    Obter perfil do usuário
// @route   GET /api/users/profile
// @access  Private (requer autenticação)
async function getUserProfile(req, res) {
  const userId = req.user.id;

  try {
    const user = await userUseCases.findUserById(userId);

    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar perfil.' });
  }
}

// @desc    Atualizar perfil do usuário
// @route   PUT /api/users/profile
// @access  Private (requer autenticação)
async function updateUserProfile(req, res) {
  const userId = req.user.id;
  const { name, email, password, role } = req.body;

  try {
    const updatedUser = await userUseCases.updateUser(userId, { name, email, password, role });

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      message: 'Perfil atualizado com sucesso.',
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    res.status(400).json({ message: error.message || 'Erro ao atualizar perfil.' });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
};

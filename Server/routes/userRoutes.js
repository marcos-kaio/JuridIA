import express from 'express';
import { User } from '../models/db.js';
import { requireAuth } from '../middlewares/auth.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds = 10;

dotenv.config();

const router = express.Router();
router.use(express.json());

// cadastro de novo usuário - /user/register
router.post('/register', async (req, res) => {
  try {
    // ordem da estrutura de envio de requisição:
    const { username, email, birthday, escolaridade, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: 'O nome de usuário, email e senha são obrigatórios!' });
    }

    // verificação da existência do email no banco de dados
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      // MENSAGEM DE ERRO ESPECÍFICA AQUI
      return res
        .status(409) // Status 409 (Conflict) é mais apropriado
        .json({ error: 'Este e-mail já está em uso. Por favor, tente outro.' });
    }

    // criptografia da senha
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // alocação de informações de novo usuário
    const newUser = await User.create({
      username,
      email,
      birthday,
      escolaridade,
      password: passwordHash,
    });

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      user_email: newUser.email,
      created_at: newUser.createdAt,
    });
  } catch (err) {
    console.error('Erro detalhado ao criar usuário:', err.message, err);
    return res
      .status(500)
      .json({ error: 'Ocorreu um erro interno ao cadastrar o usuário.' }); // Mensagem mais genérica para o usuário
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });

  // confere email
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

  // compara senha
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Credenciais inválidas.' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email },
  });
});

router.put('/update-education', requireAuth, async (req, res) => {
  try {
    const { escolaridade } = req.body;
    if (!escolaridade) {
      return res
        .status(400)
        .json({ error: 'O campo escolaridade é obrigatório.' });
    }

    // busca o user
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // atualiza e salva
    user.escolaridade = escolaridade;
    await user.save();

    res.json({ message: 'Nível de escolaridade atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar escolaridade:', err);
    res
      .status(500)
      .json({ error: 'Erro interno ao atualizar a escolaridade.' });
  }
});

// -- Rotas para Recuperação de Senha --

// 1. Verifica se o e-mail existe
router.post("/forgot-password/verify-email", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "O e-mail é obrigatório." });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "E-mail não encontrado." });
    
    res.status(200).json({ message: "E-mail verificado com sucesso." });
});

// 2. Verifica e-mail e data de nascimento
router.post("/forgot-password/verify-user", async (req, res) => {
    const { email, birthday } = req.body;
    if (!email || !birthday) return res.status(400).json({ error: "E-mail e data de nascimento são obrigatórios." });

    const user = await User.findOne({ where: { email, birthday } });
    if (!user) return res.status(401).json({ error: "Dados de verificação inválidos." });

    res.status(200).json({ message: "Usuário verificado com sucesso." });
});

// 3. Redefine a senha
router.post("/forgot-password/reset", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "E-mail e nova senha são obrigatórios." });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    const passwordHash = await bcrypt.hash(password, saltRounds);
    await user.update({ password: passwordHash });

    res.status(200).json({ message: "Senha redefinida com sucesso!" });
});


// verifica se token é válido
router.get('/me', requireAuth, (req, res) => {
  User.findByPk(req.user.id, {
    attributes: ['id', 'username', 'email', 'escolaridade'],
  })
    .then((user) => res.json(user))
    .catch(() => res.status(500).end());
});

export default router;
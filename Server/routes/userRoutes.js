import express from "express";
import { User } from "../models/db.js";
import { requireAuth } from "../middlewares/auth.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

dotenv.config();

const router = express.Router();
router.use(express.json());

// cadastro de novo usuário - /user/register
router.post("/register", async (req, res) => {
  try {
    // ordem da estrutura de envio de requisição:
    const { username, email, birthday, escolaridade, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "O nome de usuário, email e senha são obrigatórios!" });
    }

    // verificação da existência do email no banco de dados
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res
        .status(409)
        .json({ error: "E-mail já existente, tente outro!" });
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
    console.error("Erro ao criar usuário:", err);
    return res.status(500).json({ "Erro interno ao cadastrar usuário": err });
  }
});

// fazer login - /user/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email e senha são obrigatórios." });

  // confere email
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: "Credenciais inválidas." });

  // compara senha
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Credenciais inválidas." });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email },
  });
});

// -- inclusão de atualização de informações de user --

// -- inclusão de deleção de user --

// verifica se token é válido
router.get("/me", requireAuth, (req, res) => {
  User.findByPk(req.user.id, { attributes: ["id", "username", "email"] })
    .then((user) => res.json(user))
    .catch(() => res.status(500).end());
});

export default router;

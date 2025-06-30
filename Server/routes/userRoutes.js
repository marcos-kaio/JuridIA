import express from 'express';
import { User } from "../models/db.js";

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

    // alocação de informações de novo usuário
    const newUser = await User.create({
      username,
      email,
      birthday,
      escolaridade,
      password,
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

// -- inclusão de atualização de informações de user --

// -- inclusão de deleção de user --

export default router;
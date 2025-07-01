import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function requireAuth(req, res, next) {
  const auth = req.header("Authorization");
  if (!auth) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Formato de token inválido." });
  }

  try {
    // decodifica e verifica assinatura
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId };

    return next();
  } catch (err) {
    return res.status(401).json({ "Token inválido ou expirado": err });
  }
}

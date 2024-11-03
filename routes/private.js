import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Rota para listar os usuários que estão no banco de dados
router.get("/listar-usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({ message: "Usuários listados com sucesso", users });
  } catch (err) {
    res.status(500).json({ message: "Falha no servidor!" });
  }
});

export default router;

import express from "express";
import bcrypt, { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Criando a rota de Cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    // Informando o tamanho do hash a ser gerado
    const salt = await bcrypt.genSalt(10);
    // Gera o hashPassword encriptografando a senha do user
    const hashPassword = await bcrypt.hash(user.password, salt);

    // Criando um usuário
    const userDB = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });

    res.status(201).json(userDB);
  } catch (err) {
    res.status(500).json({ message: "Erro inesperado, tente novamente!" });
  }
});

// Criando a rota de login
router.post("/login", async (req, res) => {
  try {
    //Pegar as informações do usuário
    const userInfo = req.body;

    /**
     * Procura no banco de dados se há um usuário com o mesmo email
     * que vem no userInfo
     */
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });
    // Verifica se o usuário existe no banco de dados
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Verificar se a senha está correta (a que o usuário digitou com a que está no banco)
    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    // Se a senha não for a mesma, apresenta a mensagem
    if(!isMatch) {
        return res.status(400).json({message: 'Senha incorreta!'})
    }

    // Gerar o TokenJWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d'})
    // expiresIn => indica com quando tempo o token valerá - ficará logado


    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor, tente novamente!" });
  }
});

export default router;

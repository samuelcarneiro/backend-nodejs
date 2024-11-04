import express from "express";
// Após instalação, adicionar o 'type: module' no arquivo package.json

// Importando as rotas públicas e privadas
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";

// Permissão para o front-end acessar o servidor
import cors from "cors";

// Importando o arquivo auth.js
import auth from "./middlewares/auth.js";

// Criação da variável app para englobar o express()
const app = express();

// Fazendo que que o express retorne em json (insonia)
app.use(express.json());

app.use(cors()); //Sites que poderão acessa o backend
// app.use(cors("www.meusite.com.br")) -> Ambiente real

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

/**
 * API rotas:
 * 1 - Cadastrar (rota pública)
 * 2 - Logar (rota pública)
 * 3 - Listar usuários (rota privada)
 */

// Porta para o servidor express rodar
app.listen(3000, () => console.log("Servidor em execução!"));

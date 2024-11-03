import express from "express";
// Após instalação, adicionar o 'type: module' no arquivo package.json
// Importando as rotas públicas
import publicRoutes from './routes/public.js';
// Importando as rotas privadas
import privateRoutes from './routes/private.js';
//
import auth from './middlewares/auth.js';

// Criação da variável app para englobar o express()
const app = express();
// Fazendo que que o express retorne em json (insonia)
app.use(express.json());

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

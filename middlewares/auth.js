import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  
  //Se não houver token, negar acesso
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    //Verificação do token
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }

  next();
};

export default auth;

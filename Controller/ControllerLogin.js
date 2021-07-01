const LoginUsuario = require("../Data/DataLogin");

const jwt = require("jsonwebtoken");
const secrete = "mysecrete";

module.exports = {
  async login(req, res) {
    const { email_usuario, senha_usuario } = req.body;

    LoginUsuario.findOne(
      { email_usuario, tipo_usuario: 1 },
      function (err, user) {
        if (err) {
          console.log(err);
          res.status(400).json({ erro: "Erro no servidor" });
        } else if (!user) {
          res.status(400).json({ status: 2, erro: "Usuario não encontrado" });
        } else {
          user.isCorrectPassword(senha_usuario, async function (err, same) {
            if (err) {
              res.status(400).json({ err: "Erro no servidor" });
            } else if (!same) {
              res.status(400).json({ err: "Senha não encontrada" });
            } else {
              const playload = { email_usuario };
              const token = jwt.sign(playload, secrete, {
                expiresIn: "24h",
              });
              res.cookie("token", token, { httpOnly: true });
              res.status(200).json({
                status: 1,
                auth: true,
                token: token,
                id_cliente: user._id,
              });
            }
          });
        }
      }
    );
  },

  async cadastro(req, res) {
    const { email_usuario, senha_usuario } = req.body;

    var data = {};

    var user = await LoginUsuario.findOne({ email_usuario });
    if (!user) {
      data = { email_usuario, senha_usuario };
      user = await LoginUsuario.create(data);
      return res.status(200).json(user);
    } else {
      return res.status(400).json(user);
    }
  },

  async token(req, res) {
    const token =
      req.body.token ||
      req.query.token ||
      req.cookies.token ||
      req.headers["x-access-token"];
    req.token = token;
    if (!token) {
      res.json({ status: 401, msg: "Não autorizado: Token invalido" });
    } else {
      jwt.verify(token, secrete, function (err, decoded) {
        if (err) {
          res.json({ status: 401, msg: "Não autorizado" });
        } else {
          req.email_usuario = decoded.email_usuario;
          res.json({ status: 200 });
        }
      });
    }
  },

  async destroyToken(req, res) {
    const token = req.headers.token;
    if (token) {
      res.cookie("token", null, { httpOnly: true });
    } else {
      res.status(401).send("Logout não autorizado");
    }
    res.send("Sessão finalizada com sucesso!");
  },
};

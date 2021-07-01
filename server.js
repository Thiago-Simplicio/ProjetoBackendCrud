const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

// CONFIG SERVIDOR
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// CONEXÃO AO BANCO DE DADOS
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/ProjetoWork", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Servidor conectado ao banco de dados MongoDB");
  })
  .catch(function (error) {
    console.log("Erro no servidor ao se conectar ao banco da dados MongoDB");
  });

// ROTAS
const route = require("./Route/Route");
app.use("/", route);

// SAIDA DA PORTA DE SERVIDOR
const port = 9091;
app.listen(port, function () {
  console.log("Servidor rodando na porta http://localhost:9091");
});

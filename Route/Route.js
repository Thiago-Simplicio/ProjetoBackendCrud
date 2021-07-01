const express = require("express");
const route = express.Router();

const LoginUsuario = require("../Controller/ControllerLogin");

route.post("/login", LoginUsuario.login);
route.post("/cadastrar", LoginUsuario.cadastro);
route.get("/token", LoginUsuario.token);
route.get("/destroyToken", LoginUsuario.destroyToken);

const Cliente = require("../Controller/ControllerCliente");

route.get("/cliente", Cliente.index);
route.post("/cliente", Cliente.create);
route.put("/cliente", Cliente.update);
route.get("/cliente/:_id", Cliente.listar);
route.delete("/cliente/:_id", Cliente.delete);

const Venda = require("../Controller/ControllerVendas");

route.get("/venda", Venda.index);
route.post("/venda", Venda.create);
route.get("/venda/:_id", Venda.listar);
route.delete("/venda/:_id", Venda.delete);
route.put("/venda", Venda.update);

const Produto = require("../Controller/ControllerProduto");

route.get("/produto", Produto.index);
route.post("/produto", Produto.create);
route.get("/produto/:_id", Produto.listar);
route.delete("/produto/:_id", Produto.delete);
route.put("/produto/", Produto.update);

module.exports = route;

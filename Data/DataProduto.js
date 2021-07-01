const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema(
  {
    nome_produto: String,
    quantidade_produto: String,
    preco_produto: String,
    marca_produto: String,
  },
  {
    timestamps: true,
  }
);

const Produto = mongoose.model("Produtos", ProdutoSchema);
module.exports = Produto;

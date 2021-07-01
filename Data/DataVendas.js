const mongoose = require("mongoose");

const VendaSchema = new mongoose.Schema(
  {
    nome_venda: String,
    nome_produto_venda: String,
    preco_venda: String,
    quantidade_venda: Number,
  },
  {
    timestamps: true,
  }
);

const Venda = mongoose.model("Vendas", VendaSchema);
module.exports = Venda;

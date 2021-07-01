const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema(
  {
    nome_cliente: String,
    email_cliente: String,
    cpfcnpj_cliente: String,
    endereco_cliente: String,
    cep_cliente: Number,
    telefone_cliente: Number,
  },
  {
    timestamps: true,
  }
);

const Cliente = mongoose.model("Clientes", ClienteSchema);
module.exports = Cliente;

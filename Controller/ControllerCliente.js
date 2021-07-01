const Cliente = require("../Data/DataCliente");

module.exports = {
  async index(req, res) {
    var cli = await Cliente.find();
    return res.json(cli);
  },

  async create(req, res) {
    const {
      nome_cliente,
      email_cliente,
      cpfcnpj_cliente,
      endereco_cliente,
      cep_cliente,
      telefone_cliente,
    } = req.body;

    var data = {};

    var cli = await Cliente.findOne({ email_cliente });
    if (
      nome_cliente &&
      email_cliente &&
      cpfcnpj_cliente &&
      endereco_cliente &&
      cep_cliente &&
      telefone_cliente
    ) {
      if (!cli) {
        data = {
          nome_cliente,
          email_cliente,
          cpfcnpj_cliente,
          endereco_cliente,
          cep_cliente,
          telefone_cliente,
        };

        cli = await Cliente.create(data);
        return res.status(200).json(cli);
      } else {
        return res
          .status(400)
          .json("Esse Cliente já esta cadastro no nosso banco de dados");
      }
    }
  },

  async update(req, res) {
    const {
      _id,
      nome_cliente,
      email_cliente,
      cpfcnpj_cliente,
      endereco_cliente,
      cep_cliente,
      telefone_cliente,
    } = req.body;

    const data = {
      nome_cliente,
      email_cliente,
      cpfcnpj_cliente,
      endereco_cliente,
      cep_cliente,
      telefone_cliente,
    };

    var cli = await Cliente.findOneAndUpdate({ _id }, data, { new: true });
    return res.json(cli);
  },

  async listar(req, res) {
    const { _id } = req.params;
    var cli = await Cliente.findOne({ _id });
    return res.json(cli);
  },

  async delete(req, res) {
    const { id } = req.params;
    var cli = await Cliente.findOneAndDelete({ id });
    return res.json(cli);
  },
};

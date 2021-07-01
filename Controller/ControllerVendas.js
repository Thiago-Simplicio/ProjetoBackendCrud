const Venda = require("../Data/DataVendas");

module.exports = {
  async index(req, res) {
    var ven = await Venda.find();
    return res.json(ven);
  },

  async create(req, res) {
    const { nome_venda, nome_produto_venda, quantidade_venda, preco_venda } =
      req.body;

    var data = {};

    var ven;

    if (nome_venda && nome_produto_venda && quantidade_venda && preco_venda) {
      data = { nome_venda, nome_produto_venda, quantidade_venda, preco_venda };
      ven = await Venda.create(data);
      return res.status(200).json(ven);
    } else {
      return res.status(400).json("Erro ao realizar a venda");
    }
  },

  async listar(req, res) {
    const { _id } = req.params;
    var ven = await Venda.findOne({ _id });
    return res.json(ven);
  },

  async delete(req, res) {
    const { _id } = req.params;
    var ven = await Venda.findByIdAndDelete({ _id });
    return res.json(ven);
  },

  async update(req, res) {
    const {
      _id,
      nome_venda,
      nome_produto_venda,
      quantidade_venda,
      preco_venda,
    } = req.body;
    const data = {
      nome_venda,
      nome_produto_venda,
      quantidade_venda,
      preco_venda,
    };
    var ven = await Venda.findByIdAndUpdate({ _id }, data, { new: true });
    return res.json(ven);
  },
};

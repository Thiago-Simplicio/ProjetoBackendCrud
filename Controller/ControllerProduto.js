const Produto = require("../Data/DataProduto");

module.exports = {
  async index(req, res) {
    var prod = await Produto.find();
    return res.json(prod);
  },

  async create(req, res) {
    const { nome_produto, quantidade_produto, preco_produto, marca_produto } =
      req.body;

    var data = {};

    var prod;
    if (nome_produto && quantidade_produto && preco_produto && marca_produto) {
      data = { nome_produto, quantidade_produto, preco_produto, marca_produto };
      prod = await Produto.create(data);
      return res.status(200).json(prod);
    } else {
      return res.status(400).json("Erro ao cadastrar produto");
    }
  },

  async update(req, res) {
    const {
      _id,
      nome_produto,
      quantidade_produto,
      preco_produto,
      marca_produto,
    } = req.body;
    const data = {
      nome_produto,
      quantidade_produto,
      preco_produto,
      marca_produto,
    };
    var prod = await Produto.findOneAndUpdate({ _id }, data, { new: true });
    return res.json(prod);
  },

  async listar(req, res) {
    const { _id } = req.params;
    var prod = await Produto.findOne({ _id });
    return res.json(prod);
  },

  async delete(req, res) {
    const { _id } = req.params;
    var prod = await Produto.findOneAndDelete({ _id });
    return res.json(prod);
  },
};

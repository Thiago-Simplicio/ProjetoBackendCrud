const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const LoginSchema = new mongoose.Schema({
  email_usuario: String,
  senha_usuario: String,
  tipo_usuario: { type: Number, default: 1 },
});

LoginSchema.pre("save", function (next) {
  if (this.isModified("senha_usuario")) {
    next();
  }
  this.senha_usuario = bcrypt.hashSync(this.senha_usuario, 10);
  next();
});

LoginSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.senha_usuario, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const LoginUsuario = mongoose.model("LoginUsuario", LoginSchema);
module.exports = LoginUsuario;

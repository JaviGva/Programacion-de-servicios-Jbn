const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    iva: Number
});

const Articulo = mongoose.model('Articulo', articuloSchema);

module.exports = Articulo;
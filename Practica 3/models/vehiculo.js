const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    año: Number,
    color: String
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;
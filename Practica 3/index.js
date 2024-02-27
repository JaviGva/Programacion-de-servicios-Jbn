const express = require('express');
const mongoose = require('mongoose');
const Vehiculo = require('./models/vehiculo');

mongoose.connect('mongodb://localhost:27017/vehiculos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));

const app = express();
app.use(express.json());

// Endpoint para obtener todos los vehículos
app.get('/vehiculos', async (req, res) => {
    console.log("Get all vehiculos")
    try {
        const vehiculos = await Vehiculo.find();
        res.json(vehiculos);
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener un vehículo por su ID
app.get('/vehiculos/:id', async (req, res) => {
    console.log("Get vehiculo by id")
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json(vehiculo);
    } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener vehículos por marca y modelo
app.get('/vehiculos/:marca/:modelo', async (req, res) => {
    console.log("Get vehiculo by marca y modelo")
    try {
        const vehiculos = await Vehiculo.find({ marca: req.params.marca, modelo: req.params.modelo });
        res.json(vehiculos);
    } catch (error) {
        console.error('Error al obtener los vehículos por marca y modelo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para insertar un vehículo
app.post('/vehiculos', async (req, res) => {
    console.log("Post vehiculos")
    try {
        const vehiculo = await Vehiculo.create(req.body);
        res.status(201).json(vehiculo);
    } catch (error) {
        console.error('Error al insertar el vehículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para actualizar un vehículo por su ID
app.put('/vehiculos/:id', async (req, res) => {
    console.log("Put vehiculo by Id")
    try {
        const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json(vehiculo);
    } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar un vehículo por su ID
app.delete('/vehiculos/:id', async (req, res) => {
    console.log("Delete vehiculo by Id")
    try {
        const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json({ mensaje: 'Vehículo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

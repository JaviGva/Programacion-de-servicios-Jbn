const express = require('express');
const mongoose = require('mongoose');
const Articulo = require('./models/articulo');
const path = require('path');
const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/articulos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));

const app = express();
app.use(express.json());

// Endpoint para obtener todos los articulos
app.get('/articulos', async (req, res) => {
    console.log("Get all articulos")
    try {
        
        const articulos = await Articulo.find();
        res.json(articulos);
    } catch (error) {
        console.error('Error al obtener los articulos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/articulos/filter', async (req, res) => {
    console.log("Get articulo")
    try {
        let precioInferior = req.query.P
        if(precioInferior == undefined){
            precioInferior = 0
        }
        let ivaSuperior = req.query.I
        if(ivaSuperior == undefined){
            ivaSuperior = 0
        }
        console.log(precioInferior)
        console.log(ivaSuperior)
        let articulos = await Articulo.find();
        articulos = articulos.filter((articulo) => articulo.precio > precioInferior || articulo.iva < ivaSuperior);
        res.json(articulos);
    } catch (error) {
        console.error('Error al obtener los articulos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener un articulo por su ID
app.get('/articulos/:id', async (req, res) => {
    console.log("Get articulo by id")
    try {
        const articulo = await Articulo.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({ error: 'Articulo no encontrado' });
        }
        let precio = ((articulo.iva / 100) + 1) * articulo.precio
        //console.log(precio)
        let precioJson = {
            precio: precio
        }
        res.json(precioJson);
    } catch (error) {
        console.error('Error al obtener el articulo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Endpoint para insertar un articulo
app.post('/articulos', async (req, res) => {
    console.log("Post articulo")
    try {
        const articulo = await Articulo.create(req.body);
        res.status(201).json(articulo);
    } catch (error) {
        console.error('Error al insertar el articulo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener una pagina por su nombre
app.get('/paginas/:name', async (req, res) => {
    console.log("Get page by name")
    try {
        let pageName = req.params.name
        
        res.contentType("text/html");
        
        let page = path.join(__dirname, '/archivosHtml/'+ pageName +'.html')
        res.sendFile(page);
    } catch (error) {
        console.error('Error al obtener la pagina:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

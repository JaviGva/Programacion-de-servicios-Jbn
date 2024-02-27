const express = require("express");
const mongoose = require("mongoose");
const url = require('url');

console.log("inicio")

mongoose.connect('mongodb://localhost:27017/biblioteca');

let libroSchema = new mongoose.Schema({
    titulo: String,
    autor: [String],
    ejemplares: Number
    });

let Libro = mongoose.model('libros', libroSchema);

let app = express();
app.use(express.json());
app.listen(8080);


app.get('/libros', (req, res) => {
    console.log("get")
    Libro.find().then(result => {
        res.send(result);
    });
});

app.get('/libros/:id', (req, res) => {
    console.log("get con id")
    const libroId = req.params.id;
    
    // Buscar el libro por su ID en la base de datos
    Libro.findById(libroId)
        .then(libroEncontrado => {
            if (libroEncontrado) {
                // Si se encuentra el libro, devolverlo en la respuesta
                res.send(libroEncontrado);
            } else {
                // Si no se encuentra el libro, devolver un mensaje de error
                res.status(404).send('Libro no encontrado');
            }
        })
        .catch(error => {
            // Si hay algún error durante la búsqueda, devolver un mensaje de error interno del servidor
            console.error('Error al buscar el libro:', error);
            res.status(500).send('Error interno del servidor al buscar el libro');
        });
});

app.post('/libros', (req, res) => {
    console.log("post")
    console.log(req.body);

    // Crear un nuevo documento de libro utilizando los datos del cuerpo de la solicitud
    const nuevoLibro = new Libro({
        titulo: req.body.titulo,
        autor: req.body.autor,
        ejemplares: req.body.ejemplares
    });

    // Guardar el nuevo libro en la base de datos
    nuevoLibro.save()
        .then(libroGuardado => {
            console.log('Libro guardado:', libroGuardado);
            res.send('Libro guardado en la base de datos');
        })
        .catch(error => {
            console.error('Error al guardar el libro:', error);
            res.status(500).send('Error interno del servidor al guardar el libro');
        });
});

app.put('/libros/:id', (req, res) => {
    const libroId = req.params.id;
    const { titulo, autor, ejemplares } = req.body;

    // Buscar y actualizar el libro en la base de datos
    Libro.findByIdAndUpdate(libroId, { titulo, autor, ejemplares }, { new: true })
        .then(libroActualizado => {
            if (libroActualizado) {
                res.send(libroActualizado); // Devuelve el libro actualizado
            } else {
                res.status(404).send('Libro no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al actualizar el libro:', error);
            res.status(500).send('Error interno del servidor al actualizar el libro');
        });
});

app.delete('/libros/:id', (req, res) => {
    const libroId = req.params.id;

    // Buscar y eliminar el libro de la base de datos
    Libro.findByIdAndDelete(libroId)
        .then(libroEliminado => {
            if (libroEliminado) {
                res.send('Libro eliminado correctamente'); // Devuelve un mensaje de éxito
            } else {
                res.status(404).send('Libro no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el libro:', error);
            res.status(500).send('Error interno del servidor al eliminar el libro');
        });
});
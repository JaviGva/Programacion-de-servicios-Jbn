const http = require("http")

const fs = require("fs")
const urlModule = require('url');


// Corrgido, ya no se usa el array de paginas y vale con cualquiera que exista
//let paginas = ["/index.html", "/pagina2.html", "/pagina3.html", "/", "/img/maxresdefault.jpg", "/styles.css", "/estilos.css"]

const mm = require("./contentType.js");

const requestListener = function (request, response){
    console.log("Se ha producido una petición")
    

    var url_parts = urlModule.parse(request.url, true);
    const lang = url_parts.query.lang || "es";

    let url = request.url
    url = url.split("?")[0]
    
    if(url === '/'){ // Corrección: comprobacion con '/'
        console.log("entro")
        url = "/index.html"
        console.log(url)
    }
    console.log(lang)
    
    console.log(url)
    
    
    if(lang === 'en'){
        url = '/en' + url.split("/")[1]
    }
    // Si la solicitud es para la ruta principal, lee el archivo index.html
    fs.readFile('.' + url, function (err, data) {
        if (err) {
            console.error(err);
            let statusCode = 500;
            let errorMessage = 'Error interno del servidor';

            switch (err.code) {
                case 'ENOENT':
                    statusCode = 404;
                    errorMessage = 'Archivo no encontrado';
                    break;
                case 'EACCES':
                    statusCode = 403;
                    errorMessage = 'Acceso prohibido';
                    break;
            }
            response.writeHead(statusCode, {'Content-Type': 'text/plain'});
            response.end(errorMessage);
            return;
        }

        if(url != '/estilos.css'){
            response.writeHead(200, {'Content-Type': mm.content(url)});
        }else{
            response.writeHead(301, {'Location': '/styles.css'});
        }

        response.write(data);
        response.end();
    });
    
};

const server = http.createServer(requestListener);

server.listen(80);


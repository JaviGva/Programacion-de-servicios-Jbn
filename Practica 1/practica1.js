const http = require("http")

const fs = require("fs")
const urlModule = require('url');

const path = require("path");

/*
Corrección:
Al entrar en la página se produce un error
    ReferenceError: filePath is not defined
    Que detiene el servidor. Efectivamente la declaración y asignación de esa variable está comentada. La descomento para que funcione.
    Al descomentarlo me da un error ya que path no está definido. Añado la línea const path = require("path");

*/

// Corrección: Este array no me gusta un pelo ¿Y si hay 600 páginas? ¿Y si queremos incluir una nueva? ¿Tenemos que modificar el código?
let paginas = ["/index.html", "/pagina2.html", "/pagina3.html", "/", "/img/maxresdefault.jpg", "/styles.css"]

const mm = require("./contentType.js");

const requestListener = function (request, response){
    console.log("Se ha producido una petición")
    

    var url_parts = urlModule.parse(request.url, true);
    const lang = url_parts.query.lang || "es";

    let url = request.url
    url = url.split("?")[0]
    
    if(url == paginas[3]){ // Corrección: Prefiero que pongas '/' o que me declares una variable que almacene '/' pero resulta raro que accedas a la posición 3 de un array ¿Por qué la 3?
        console.log("entro")
        url = paginas[0]
        console.log(url)
    }
    console.log(lang)
    
    console.log(url)
    
    if (paginas.includes(url)) {
        if(lang === 'en'){
            url = '/en' + url.split("/")[1]
        }
        // Si la solicitud es para la ruta principal, lee el archivo index.html
        fs.readFile('.' + url, function (err, data) {
            if (err) {
                console.error(err);
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Error interno del servidor');
                return;
            }

            response.writeHead(200, {'Content-Type': mm.content(url)});
            response.write(data);
            response.end();
        });
    } else if (request.url === '/estilos.css'){
        const filePath = path.join(__dirname, 'styles.css');
        // Corrección: En este caso se tiene que responder al cliente, con un código específico para tal efecto, que estilos.css ya no existe y que debe hacer
        // la petición sobre el recurso styles.css. Para eso hay un código de respuesta (rango de los 300) y una cabecera http que permite indicar la nueva ubicación del recurso.
        // Investiga en Internet HTTP Redirection.
        fs.readFile(filePath, 'utf8', (err, data) => { // Corrección: ¿No se podría haber implementado de forma que solo hubiera un fs.readFile?
            if (err) {
                console.error(err);
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Error interno del servidor');
                return;
            }

            response.writeHead(301, {'Location': '/styles.css'});
            response.write(data);
            response.end();
        });
    }else {
        console.log("404")
        // Si la solicitud es para cualquier otra ruta, responde con 404 Not Found
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Not Found');
    }
};

const server = http.createServer(requestListener);

server.listen(80);


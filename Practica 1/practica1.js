const http = require("http")

const fs = require("fs")
const urlModule = require('url');


let paginas = ["/index.html", "/pagina2.html", "/pagina3.html", "/", "/img/maxresdefault.jpg", "/styles.css"]

const mm = require("./contentType.js");

const requestListener = function (request, response){
    console.log("Se ha producido una petición")
    

    var url_parts = urlModule.parse(request.url, true);
    const lang = url_parts.query.lang || "es";

    let url = request.url
    url = url.split("?")[0]
    
    if(url == paginas[3]){
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
        //const filePath = path.join(__dirname, 'styles.css');

        fs.readFile(filePath, 'utf8', (err, data) => {
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


function ContentType (url){
    const path = require('path');
    let extension = path.extname(url);
    extension = extension.slice(1);
    // Corrección: Debería comprobarse la extensión para ver si es html, css o jpg. En función de eso devolverá el content type correspondiente.
    return "text/" + extension;
}

module.exports = {
    content: ContentType
};
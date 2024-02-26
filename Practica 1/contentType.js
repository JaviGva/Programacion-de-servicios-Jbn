function ContentType(url) {
    const path = require('path');
    let extension = path.extname(url);
    extension = extension.slice(1);

    // Comprobar la extensión para determinar el content type
    switch (extension) {
        case 'html':
            return 'text/html';
        case 'css':
            return 'text/css';
        case 'jpg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream'; // Tipo por defecto si no se reconoce la extensión
    }
}

module.exports = {
    content: ContentType
};
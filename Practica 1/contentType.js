function ContentType (url){
    const path = require('path');
    let extension = path.extname(url);
    extension = extension.slice(1);
    return "text/" + extension;
}

module.exports = {
    content: ContentType
};
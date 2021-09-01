module.exports = function(res, file) {
    res
        .status(200)
        .setHeader('Content-Type', 'image/jpeg')
        .setHeader('Cache-Control', 'public, immutable, no-transform')
        .end(file);
}
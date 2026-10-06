// Middleware de Logging
function loggin(req, res, next) {
    const metodo = req.method;
    const url = req.url;

    let metodoCol;
    switch (metodo) {
        case 'GET': 
            metodoCol = metodo.bgGreen;
            break;
        case 'POST':
            metodoCol = metodo.bgYellow;
            break;
        case 'PUT':
            metodoCol = metodo.bgBlue;
            break;
        case 'DELETE':
            metodoCol = metodo.bgRed;
            break;
        default:
            metodoCol = metodo.white;
    }

    console.log(`[${new Date().toISOString()}] ${metodoCol} ${url.cyan}`);
    next(); 
};

module.exports = loggin;
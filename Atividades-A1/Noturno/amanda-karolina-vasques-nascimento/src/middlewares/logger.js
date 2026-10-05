require('colors');

const logger = (req, res, next) => {
    const dataAtual = new Date().toISOString();
    
    // Intercepta o envio da resposta para capturar o Status Code
    res.on('finish', () => {
        let statusColor = res.statusCode >= 400 ? 'red' : res.statusCode >= 300 ? 'yellow' : 'green';
        console.log(`[${dataAtual}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`[statusColor]);
    });

    next();
};

module.exports = logger;
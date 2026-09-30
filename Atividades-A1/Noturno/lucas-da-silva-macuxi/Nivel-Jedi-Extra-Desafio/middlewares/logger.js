const colors = require('colors');

const logger = (req, res, next) => {
    // Captura o momento exato em que a resposta é finalizada
    res.on('finish', () => {
        const status = res.statusCode;
        let statusColorido = status.toString();

        // Pinta o status code de acordo com o resultado
        if (status >= 200 && status < 300) {
            statusColorido = statusColorido.green; // Sucesso (verde)
        } else if (status >= 400 && status < 500) {
            statusColorido = statusColorido.yellow; // Erro do cliente (amarelo)
        } else if (status >= 500) {
            statusColorido = statusColorido.red; // Erro do servidor (vermelho)
        }

        // Imprime no terminal: [MÉTODO] /rota - Status: 200
        console.log(`[${req.method.cyan}] ${req.originalUrl} - Status: ${statusColorido}`);
    });

    // Passa para a próxima etapa (senão a requisição fica travada)
    next();
};

module.exports = logger;
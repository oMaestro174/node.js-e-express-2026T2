require("colors");

// Funcao pra decidir a cor
function corDoStatus(status) {
    if (status >= 500) return "red";
    if (status >= 400) return "yellow";
    if (status >= 200) return "green";
    return "white";
}

// Funcao logger
function logger(req, res, next) {
    res.on("finish", () => {
        const cor = corDoStatus(res.statusCode);
        const linha = `${req.method} ${req.url} ${res.statusCode}`;

        console.log(linha[cor]);
    });

    next();
}

// Exportando o objeto
module.exports = logger;
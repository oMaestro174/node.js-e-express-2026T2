const app = require("./app");
const port = 3000;
require("colors");

// inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor iniciado em `,`http://localhost:${port}`.green.underline);
});
const colors = require('colors');

/**
 * Registra no terminal os dados principais de cada requisicao.
 *
 * O status e exibido com uma cor de acordo com sua faixa HTTP:
 * - verde: sucesso (2xx);
 * - amarelo: erro causado pela requisicao do cliente (4xx);
 * - vermelho: erro no servidor (5xx);
 * - ciano: demais status.
 */
function loggerMiddleware(req, res, next) {
  // Guarda o horario de inicio para calcular a duracao da requisicao.
  const inicio = Date.now();

  // O evento "finish" ocorre quando o Express termina de enviar a resposta.
  // Nesse momento, res.statusCode representa o status realmente retornado.
  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    const status = res.statusCode;
    let statusFormatado = status.toString();

    // Define a cor do status para facilitar a leitura dos logs no terminal.
    if (status >= 200 && status < 300) {
      statusFormatado = colors.green(statusFormatado);
    } else if (status >= 400 && status < 500) {
      statusFormatado = colors.yellow(statusFormatado);
    } else if (status >= 500) {
      statusFormatado = colors.red(statusFormatado);
    } else {
      statusFormatado = colors.cyan(statusFormatado);
    }

    // Colore o metodo e a URL separadamente para destacar a requisicao registrada.
    const metodoFormatado = colors.bold.magenta(req.method);
    const urlFormatada = colors.white(req.originalUrl);

    // Exibe metodo, URL, status HTTP e tempo total de processamento.
    console.log(`[${metodoFormatado}] ${urlFormatada} - Status: ${statusFormatado} (${duracao}ms)`);
  });

  // Libera o fluxo para que os proximos middlewares e a rota sejam executados.
  next();
}

module.exports = loggerMiddleware;

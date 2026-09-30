const authMiddleware = (req, res, next) => {
    // Captura o token enviado no header "authorization"
    const token = req.headers['authorization'];

    // Define qual é o token válido para a nossa API (pode ser qualquer string)
    const tokenValido = 'token-jedi-123';

    // Se não houver token ou se o token for diferente do esperado
    if (!token || token !== tokenValido) {
        // Retorna status 401 (Unauthorized) e encerra a requisição aqui mesmo
        return res.status(401).json({ erro: 'Acesso negado. Token ausente ou inválido.' });
    }

    // Se o token estiver correto, chama o next() para permitir que a requisição continue
    next();
};

module.exports = authMiddleware;
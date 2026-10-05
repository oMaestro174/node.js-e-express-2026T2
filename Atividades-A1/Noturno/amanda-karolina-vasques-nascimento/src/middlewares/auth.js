const auth = (req, res, next) => {
    const token = req.headers['authorization'];

    // Token fixo exigido para liberar o acesso às rotas protegidas
    const TOKEN_SECRETO = "token-123";

    if (!token) {
        return res.status(401).json({ erro: "Acesso negado! Senha não fornecida no header (authorization)." });
    }

    if (token !== TOKEN_SECRETO) {
        return res.status(401).json({ erro: "Senha inválido!" });
    }

    next(); // Se estiver tudo certo, o fluxo continua
};

module.exports = auth;
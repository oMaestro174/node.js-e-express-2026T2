-- =====================================================================
-- SCRIPT OFICIAL UNIFICADO DE CRIAÇÃO DO BANCO DE DADOS: task_manager
-- Instituto de Tecnologia e Aprendizado Moderno - ITEAM
-- Disciplina: Desenvolvimento de APIs com Node.js e Express
-- Compatibilidade: Aulas 05, 06, 07, 08, 09 e 10 (CRUD, MVC e Testes)
-- =====================================================================

-- 0. Instrução prévia (se ainda não criou o banco):
-- Abra o terminal do PostgreSQL (psql) ou DBeaver e execute:
-- CREATE DATABASE task_manager;
-- Conecte-se ao banco task_manager antes de executar os comandos abaixo.

-- ---------------------------------------------------------------------
-- 1. TABELA DE USUÁRIOS (users)
-- Suporta tanto login por email (Aula 06) quanto por username (Aula 09/10)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    password_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- 2. TABELA DE TAREFAS (tasks)
-- Suporta tanto 'status'/'due_date' (Aula 05/06) quanto 'completed' (Aula 09/10)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pendente',
    completed BOOLEAN DEFAULT FALSE,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para otimização de consultas por usuário
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);

-- ---------------------------------------------------------------------
-- 3. TABELA DE PRODUTOS (produtos)
-- Utilizada em atividades complementares e documentação RESTful/Swagger (Aulas 07/08)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    estoque INTEGER DEFAULT 0,
    categoria VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- 4. TRIGGERS INTELIGENTES DE COMPATIBILIDADE AUTOMÁTICA
-- Sincroniza automaticamente password com password_hash e status com completed
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_user_passwords()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.password IS NOT NULL AND NEW.password_hash IS NULL THEN
        NEW.password_hash := NEW.password;
    END IF;
    IF NEW.password_hash IS NOT NULL AND NEW.password IS NULL THEN
        NEW.password := NEW.password_hash;
    END IF;
    IF NEW.username IS NULL THEN
        NEW.username := split_part(NEW.email, '@', 1);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_user_passwords ON users;
CREATE TRIGGER trg_sync_user_passwords
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION sync_user_passwords();

-- Sincronização entre status (texto) e completed (booleano)
CREATE OR REPLACE FUNCTION sync_task_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.completed IS TRUE AND NEW.status = 'pendente' THEN
        NEW.status := 'concluída';
    ELSIF NEW.status = 'concluída' AND (NEW.completed IS FALSE OR NEW.completed IS NULL) THEN
        NEW.completed := TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_task_status ON tasks;
CREATE TRIGGER trg_sync_task_status
BEFORE INSERT OR UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION sync_task_status();

-- ---------------------------------------------------------------------
-- 5. DADOS SEMENTE DE EXEMPLO (SEEDS)
-- Cria um usuário inicial para testes com senha criptografada: 'senha123'
-- Hash bcrypt correspondente: '$2a$10$yFfBfB7rW5Zc4s9Yq0oM1.uM1XbB9E3s5zB9fB7rW5Zc4s9Yq0oM.'
-- ---------------------------------------------------------------------
INSERT INTO users (name, username, email, password, password_hash)
VALUES (
    'Professor ITEAM',
    'professor',
    'professor@iteam.edu.br',
    '$2b$10$lrXiGHCot604f7spHCfW4OX.EBx9xPa.DQtTBavN3iBhZWiiJm68m',
    '$2b$10$lrXiGHCot604f7spHCfW4OX.EBx9xPa.DQtTBavN3iBhZWiiJm68m'
)
ON CONFLICT (email) DO NOTHING;

-- Inserir tarefas iniciais vinculadas ao usuário de teste
INSERT INTO tasks (user_id, title, description, status, completed, due_date)
SELECT id, 'Configurar Ambiente Node.js', 'Instalar Node LTS e bibliotecas express, pg, dotenv', 'concluída', TRUE, '2026-04-10'
FROM users WHERE email = 'professor@iteam.edu.br'
AND NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Configurar Ambiente Node.js');

INSERT INTO tasks (user_id, title, description, status, completed, due_date)
SELECT id, 'Construir API RESTful', 'Implementar rotas GET, POST, PUT e DELETE com PostgreSQL', 'pendente', FALSE, '2026-04-20'
FROM users WHERE email = 'professor@iteam.edu.br'
AND NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Construir API RESTful');

-- Inserir produtos de teste
INSERT INTO produtos (nome, preco, estoque, categoria)
SELECT 'Notebook Gamer', 7500.00, 30, 'Eletrônicos'
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Notebook Gamer');

INSERT INTO produtos (nome, preco, estoque, categoria)
SELECT 'Cadeira de Escritório', 1200.00, 50, 'Móveis'
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Cadeira de Escritório');

-- Script para configurar o banco de dados do Eu Personal
-- Execute este script no SQL Editor do Supabase

-- 1. Criar a tabela alunos
CREATE TABLE IF NOT EXISTS public.alunos (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;

-- 3. Criar políticas de segurança
-- Política para inserção (usuários podem inserir seus próprios dados)
CREATE POLICY "Usuários podem inserir seus próprios dados" ON public.alunos
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Política para leitura (usuários podem ler seus próprios dados)
CREATE POLICY "Usuários podem ler seus próprios dados" ON public.alunos
    FOR SELECT USING (auth.uid() = id);

-- Política para atualização (usuários podem atualizar seus próprios dados)
CREATE POLICY "Usuários podem atualizar seus próprios dados" ON public.alunos
    FOR UPDATE USING (auth.uid() = id);

-- Política para exclusão (usuários podem excluir seus próprios dados)
CREATE POLICY "Usuários podem excluir seus próprios dados" ON public.alunos
    FOR DELETE USING (auth.uid() = id);

-- 4. Criar função para atualizar o timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Criar trigger para atualizar o timestamp automaticamente
CREATE TRIGGER update_alunos_updated_at 
    BEFORE UPDATE ON public.alunos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 6. Verificar se a tabela foi criada
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'alunos' 
ORDER BY ordinal_position;

# Problemas Identificados e Soluções

## 🔍 Problemas Encontrados

### 1. **Dependências não instaladas**
- O projeto tinha dependências faltando, incluindo `@supabase/supabase-js`
- **Solução**: Execute `npm install` na raiz do projeto

### 2. **Funções depreciadas do Supabase**
- `supabase.auth.user()` está depreciada na versão atual
- **Solução**: Substituída por `supabase.auth.getUser()`

### 3. **CSS faltando para mensagens**
- As classes `.login-message` e `.signup-message` não tinham estilos definidos
- **Solução**: Adicionados estilos CSS para exibir as mensagens corretamente

### 4. **Código desnecessário e com erros**
- Funções não utilizadas que referenciam campos inexistentes
- Chamadas para funções não definidas
- **Solução**: Removido código desnecessário e corrigidos os erros

### 5. **Possível problema com a tabela 'alunos'**
- A tabela pode não existir no Supabase ou ter políticas de segurança restritivas

## 🛠️ Como Testar

### Teste 1: Conexão Completa (RECOMENDADO)
Abra `www/test-connection.html` no navegador para um diagnóstico completo da conectividade.

### Teste 2: Conexão Básica
Abra `www/test-supabase.html` no navegador para verificar se a conexão com o Supabase está funcionando.

### Teste 3: Tabela Alunos
Abra `www/test-table.html` no navegador para verificar se a tabela 'alunos' existe e está acessível.

## 📋 Passos para Resolver

### 1. **Instalar dependências**
```bash
npm install
```

### 2. **Criar tabela no Supabase (IMPORTANTE!)**
- Acesse o painel do Supabase: https://supabase.com/dashboard
- Vá para o seu projeto `bntdzvjyemwvpzttptwu`
- Clique em "SQL Editor" no menu lateral
- Execute o script completo do arquivo `setup-database.sql`
- Ou copie e cole o SQL abaixo:

```sql
-- Criar tabela alunos
CREATE TABLE IF NOT EXISTS public.alunos (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Usuários podem inserir seus próprios dados" ON public.alunos
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem ler seus próprios dados" ON public.alunos
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios dados" ON public.alunos
    FOR UPDATE USING (auth.uid() = id);
```

### 3. **Verificar configurações do projeto**
- No painel do Supabase, vá em "Settings" → "API"
- Confirme que as chaves estão corretas
- Verifique se o projeto está ativo (não pausado)
- Confirme que o domínio está correto: `bntdzvjyemwvpzttptwu.supabase.co`

### 4. **Testar o cadastro**
- Primeiro, execute o teste completo: `www/test-connection.html`
- Depois, teste o cadastro: `www/pages/cadastro.html`
- Verifique o console do navegador para erros detalhados
- Se houver erro "upstream connect error", pode ser problema de rede ou projeto pausado

## 🚨 Possíveis Erros

### "relation 'alunos' does not exist"
- A tabela não foi criada no Supabase
- Crie a tabela seguindo a estrutura sugerida acima

### "upstream connect error or disconnect/reset before headers"
- **Problema de conectividade com o Supabase**
- Possíveis causas:
  - Projeto pausado por inatividade
  - Problemas de rede/firewall
  - Chaves de API incorretas
  - Projeto excluído ou suspenso
- **Soluções:**
  - Verifique se o projeto está ativo no painel do Supabase
  - Confirme as chaves de API em Settings → API
  - Teste a conectividade com `www/test-connection.html`
  - Entre em contato com o suporte do Supabase se o problema persistir

### "new row violates row-level security policy"
- As políticas de segurança estão muito restritivas
- Configure as políticas conforme sugerido acima

### "Invalid API key"
- A chave da API do Supabase pode ter expirado
- Verifique as chaves no painel do Supabase

## 📱 Testando no Dispositivo

Se estiver testando em um dispositivo móvel:
1. Certifique-se de que o dispositivo tem acesso à internet
2. Verifique se não há bloqueios de firewall
3. Teste primeiro no navegador do computador

## 🔧 Arquivos Corrigidos

- ✅ `www/pages/cadastro.html` - Corrigido funções depreciadas e melhorado tratamento de erros
- ✅ `www/pages/login.html` - Corrigido funções depreciadas e melhorado tratamento de erros
- ✅ `package.json` - Dependências instaladas
- ✅ CSS adicionado para mensagens de erro/sucesso

## 📞 Próximos Passos

1. Teste a conexão com `test-supabase.html`
2. Teste a tabela com `test-table.html`
3. Se houver problemas, verifique o painel do Supabase
4. Teste o cadastro e login
5. Verifique o console do navegador para erros detalhados

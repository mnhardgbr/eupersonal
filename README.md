# Eu Personal - App de Treinos Personalizados

Um aplicativo móvel desenvolvido com Apache Cordova para criação de treinos personalizados com vídeos do YouTube integrados.

## 🚀 Funcionalidades

- **Questionário Personalizado**: Sistema inteligente que gera treinos baseados no perfil do usuário
- **Cronograma Semanal**: Organização automática de treinos por semanas
- **Vídeos Integrados**: Exercícios com vídeos do YouTube que abrem dentro do app
- **Interface Moderna**: Design dark theme com Tailwind CSS
- **Autenticação**: Sistema de login/cadastro com Supabase
- **Multiplataforma**: Funciona em Android e iOS

## 🛠️ Tecnologias

- **Apache Cordova**: Framework para desenvolvimento móvel
- **Supabase**: Backend-as-a-Service (autenticação e banco de dados)
- **Tailwind CSS**: Framework CSS para design responsivo
- **Framework7**: Framework UI para apps móveis
- **YouTube API**: Integração com vídeos de exercícios

## 📱 Como Usar

### Web (Desenvolvimento)
1. Clone o repositório
2. Abra `www/index.html` no navegador
3. Ou use um servidor local: `cordova serve`

### Mobile (Produção)
1. Instale as dependências: `npm install`
2. Adicione plataformas: `cordova platform add android ios`
3. Build: `cordova build android`
4. Run: `cordova run android`

## 🔧 Configuração

### Variáveis de Ambiente
Configure as seguintes variáveis no Supabase:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### Plugins Cordova
O projeto inclui os seguintes plugins:
- `cordova-plugin-inappbrowser`
- `cordova-plugin-safariviewcontroller`
- `cordova-plugin-browsertab`
- `cordova-plugin-youtube-video-player`

## 📁 Estrutura do Projeto

```
www/
├── pages/
│   ├── home.html          # Página inicial
│   ├── login.html         # Login
│   ├── cadastro.html      # Cadastro
│   ├── treinos.html       # Sistema de treinos
│   ├── perfil.html        # Perfil do usuário
│   └── dieta.html         # Plano alimentar
├── css/
│   └── index.css          # Estilos principais
├── js/
│   ├── app.js             # Lógica principal
│   └── treinos-db.js      # Dados dos treinos
└── img/                   # Imagens do app
```

## 🎯 Funcionalidades Principais

### Sistema de Treinos
- Questionário com 6 perguntas personalizadas
- Geração automática de treinos baseada em:
  - Objetivo (hipertrofia, emagrecimento, condicionamento)
  - Nível de experiência
  - Frequência semanal
  - Duração do treino
  - Local de treino
  - Limitações físicas

### Cronograma Semanal
- Organização automática por semanas
- Adaptação baseada na frequência de treino
- Cobertura completa de grupos musculares

### Vídeos Integrados
- Biblioteca de exercícios com links do YouTube
- Abertura in-app usando plugins Cordova
- Fallback para navegador quando necessário

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvido por

Eu Personal - Sistema de Treinos Personalizados

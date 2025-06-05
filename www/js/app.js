// Criar namespace global
window.EuPersonal = window.EuPersonal || {};

// Usar banco global carregado por exercicios.js
const exerciciosDB = window.exerciciosDB;
import { atualizarTreinos, abrirVideoPopup } from './treinos.js';

// Initialize Framework7
var app = new Framework7({
  el: '#app',
  name: 'Eu Personal',
  id: 'com.eupersonal.app',
  theme: 'ios',
  darkMode: true,
  colors: {
    primary: '#2196f3',
  },
  view: {
    browserHistory: true,
    pushState: true,
    stackPages: true,
    reloadPages: false,
    animate: true,
    main: true,
    iosDynamicNavbar: true,
    xhrCache: false,
  },
  routes: [
    {
      path: '/',
      url: './pages/home.html',
    },
    {
      path: '/treinos/',
      url: './pages/treinos.html',
    },
    {
      path: '/dieta/',
      url: './pages/dieta.html',
    },
    {
      path: '/perfil/',
      url: './pages/perfil.html',
    },
    {
      path: '/periodizacao/',
      url: './pages/periodizacao.html',
    }
  ],
  navbar: {
    hideOnPageScroll: true,
    iosCenterTitle: true
  },
  on: {
    init: function() {
      console.log('App initialized');
      // Redirecionar para a página inicial após a inicialização
      const mainView = this.views.main;
      if (mainView) {
        mainView.router.navigate('/', {
          animate: false,
          reloadCurrent: true
        });
      }
    }
  }
});

// Adicionar funções ao namespace global
window.EuPersonal.app = app;
window.EuPersonal.atualizarTreinos = atualizarTreinos;
window.EuPersonal.abrirVideoPopup = abrirVideoPopup;
window.EuPersonal.gerarTreinoPersonalizado = gerarTreinoPersonalizado;

// Inicializa a view principal
var mainView = app.views.create('.view-main', {
  url: '/',
  stackPages: true,
  animate: true,
  main: true
});

// Função global para navegação
window.navegarPara = function(rota) {
  if (mainView && mainView.router) {
    console.log('Navegando para:', rota);
    // Remove o # se existir
    if (rota.startsWith('#')) {
      rota = rota.substring(1);
    }
    mainView.router.navigate(rota, {
      transition: 'f7-cover'
    });
  } else {
    console.error('View ou router não disponível');
  }
}

// Função para selecionar exercícios aleatoriamente de um grupo
function selecionarExercicios(grupo, quantidade, nivel) {
  if (!exerciciosDB[grupo] || !Array.isArray(exerciciosDB[grupo])) {
    return [];
  }

  // Filtra exercícios baseado no nível
  let exerciciosFiltrados = exerciciosDB[grupo];
  
  // Embaralha o array de exercícios
  const exerciciosEmbaralhados = [...exerciciosFiltrados].sort(() => Math.random() - 0.5);
  
  // Retorna a quantidade solicitada
  return exerciciosEmbaralhados.slice(0, quantidade);
}

// Função para ajustar séries e repetições baseado no objetivo e nível
function ajustarSeriesRepeticoes(exercicio, objetivo, nivel) {
  const ajustes = {
    hipertrofia: {
      iniciante: { series: 3, repeticoes: "10-12" },
      intermediario: { series: 4, repeticoes: "8-12" },
      avancado: { series: 4, repeticoes: "6-12" }
    },
    emagrecimento: {
      iniciante: { series: 3, repeticoes: "15-20" },
      intermediario: { series: 4, repeticoes: "12-15" },
      avancado: { series: 4, repeticoes: "12-15" }
    },
    resistencia: {
      iniciante: { series: 3, repeticoes: "15-20" },
      intermediario: { series: 3, repeticoes: "20-25" },
      avancado: { series: 4, repeticoes: "20-25" }
    }
  };

  const ajuste = ajustes[objetivo][nivel];
  return {
    ...exercicio,
    series: ajuste.series,
    repeticoes: ajuste.repeticoes
  };
}

// Função para gerar treino personalizado
export function gerarTreinoPersonalizado() {
  // Buscar dados do aluno
  const dadosSalvos = localStorage.getItem('dadosPeriodizacao');
  let objetivo = 'hipertrofia';
  let nivel = 'iniciante';
  let modalidade = 'musculacao';
  let frequencia = '3-4';

  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    objetivo = dados.objetivo || objetivo;
    nivel = dados.nivel || nivel;
    modalidade = dados.modalidade || modalidade;
    frequencia = dados.frequencia || frequencia;
  }

  // Estrutura base do treino
  const treino = {
    A: { nome: '', exercicios: [] }, 
    B: { nome: '', exercicios: [] }, 
    C: { nome: '', exercicios: [] } 
  };

  // Personalização dos nomes dos treinos
  if (objetivo === 'hipertrofia') {
    treino.A.nome = 'Treino A - Peito, Ombro e Tríceps';
    treino.B.nome = 'Treino B - Costas e Bíceps';
    treino.C.nome = 'Treino C - Pernas e Abdômen';
  } else if (objetivo === 'emagrecimento') {
    treino.A.nome = 'Treino A - Cardio e Peito';
    treino.B.nome = 'Treino B - Costas e HIIT';
    treino.C.nome = 'Treino C - Pernas e Abdômen';
  } else if (objetivo === 'resistencia') {
    treino.A.nome = 'Treino A - Cardio e Resistência';
    treino.B.nome = 'Treino B - Força Geral';
    treino.C.nome = 'Treino C - Pernas e Core';
  }

  // Lógica especial para funcional e caminhada
  if (modalidade === 'funcional') {
    // Blocos de exercícios para funcional
    const aquecimento = [
      { nome: 'Polichinelos', series: '2x30s', descricao: 'Aquecimento dinâmico' },
      { nome: 'Corrida Estacionária', series: '2x30s', descricao: 'Aquecimento dinâmico' },
      { nome: 'Mobilidade Articular', series: '2x10 rep', descricao: 'Mobilidade geral' }
    ];
    // Bloco principal mais robusto para emagrecimento
    const principalA = [
      { nome: 'Agachamento com Salto', series: '3x12', descricao: 'Exercício composto' },
      { nome: 'Flexão de Braço', series: '3x10', descricao: 'Exercício composto' },
      { nome: 'Avanço Alternado', series: '3x12', descricao: 'Exercício composto' },
      { nome: 'Burpee', series: '3x10', descricao: 'Exercício global' },
      { nome: 'Mountain Climber', series: '3x20', descricao: 'Cardio/HIIT' },
      { nome: 'Agachamento Sumô', series: '3x12', descricao: 'Exercício composto' }
    ];
    const core = [
      { nome: 'Prancha', series: '3x30s', descricao: 'Core' },
      { nome: 'Abdominal Remador', series: '3x15', descricao: 'Core' }
    ];
    const alongamento = [
      { nome: 'Alongamento de Pernas', series: '2x30s', descricao: 'Alongamento' },
      { nome: 'Alongamento de Braços', series: '2x30s', descricao: 'Alongamento' }
    ];
    // Treino A
    treino.A.exercicios = [
      { bloco: 'Aquecimento Dinâmico', lista: aquecimento },
      { bloco: 'Funcional Principal', lista: principalA },
      { bloco: 'Core', lista: core },
      { bloco: 'Alongamento e Mobilidade', lista: alongamento }
    ];
    // Treino B e C com mais exercícios e variação
    const principalB = [
      { nome: 'Agachamento Isométrico', series: '3x30s', descricao: 'Exercício composto' },
      { nome: 'Flexão Diamante', series: '3x8', descricao: 'Exercício composto' },
      { nome: 'Afundo', series: '3x12', descricao: 'Exercício composto' },
      { nome: 'Jumping Jack', series: '3x30s', descricao: 'Cardio/HIIT' },
      { nome: 'Polichinelos', series: '3x30s', descricao: 'Cardio/HIIT' },
      { nome: 'Burpee', series: '3x10', descricao: 'Exercício global' }
    ];
    treino.B.exercicios = [
      { bloco: 'Aquecimento Dinâmico', lista: aquecimento },
      { bloco: 'Funcional Principal', lista: principalB },
      { bloco: 'Core', lista: core },
      { bloco: 'Alongamento e Mobilidade', lista: alongamento }
    ];
    const principalC = [
      { nome: 'Agachamento Sumô', series: '3x12', descricao: 'Exercício composto' },
      { nome: 'Flexão Aberta', series: '3x10', descricao: 'Exercício composto' },
      { nome: 'Avanço Lateral', series: '3x12', descricao: 'Exercício composto' },
      { nome: 'Polichinelos', series: '3x30s', descricao: 'Cardio/HIIT' },
      { nome: 'Mountain Climber', series: '3x20', descricao: 'Cardio/HIIT' },
      { nome: 'Burpee', series: '3x10', descricao: 'Exercício global' }
    ];
    treino.C.exercicios = [
      { bloco: 'Aquecimento Dinâmico', lista: aquecimento },
      { bloco: 'Funcional Principal', lista: principalC },
      { bloco: 'Core', lista: core },
      { bloco: 'Alongamento e Mobilidade', lista: alongamento }
    ];
  } else if (modalidade === 'caminhada') {
    // Caminhada: só complementares
    const alongamento = [
      { nome: 'Alongamento de Pernas', series: '2x30s', descricao: 'Alongamento' },
      { nome: 'Alongamento de Braços', series: '2x30s', descricao: 'Alongamento' },
      { nome: 'Mobilidade de Quadril', series: '2x10 rep', descricao: 'Mobilidade' },
      { nome: 'Fortalecimento Leve', series: '2x15', descricao: 'Exercício leve' }
    ];
  treino.A.exercicios = [
      { bloco: 'Complementares Pós-Caminhada', lista: alongamento }
  ];
  treino.B.exercicios = [
      { bloco: 'Complementares Pós-Caminhada', lista: alongamento }
  ];
  treino.C.exercicios = [
      { bloco: 'Complementares Pós-Caminhada', lista: alongamento }
    ];
  } else {
    // Gera treinos dinamicamente para musculação
    const exerciciosPorTreino = {
      A: {
        grupos: ['peito', 'ombro', 'triceps'],
        quantidades: [3, 2, 2] // 3 exercícios de peito, 2 de ombro, 2 de tríceps
      },
      B: {
        grupos: ['costas', 'biceps'],
        quantidades: [3, 2] // 3 exercícios de costas, 2 de bíceps
      },
      C: {
        grupos: ['pernas', 'abdomen'],
        quantidades: [4, 2] // 4 exercícios de pernas, 2 de abdômen
      }
    };

    // Gera exercícios para cada treino
    for (const [letra, config] of Object.entries(exerciciosPorTreino)) {
      let exerciciosTreino = [];
      
      // Para cada grupo muscular no treino
      for (let i = 0; i < config.grupos.length; i++) {
        const grupo = config.grupos[i];
        const quantidade = config.quantidades[i];
        
        // Seleciona exercícios do grupo
        const exerciciosGrupo = selecionarExercicios(grupo, quantidade, nivel)
          .map(ex => ajustarSeriesRepeticoes(ex, objetivo, nivel));
        
        exerciciosTreino = exerciciosTreino.concat(exerciciosGrupo);
      }

      // Adiciona cardio se for objetivo de emagrecimento
      if (objetivo === 'emagrecimento') {
        exerciciosTreino.unshift({
          nome: "Esteira",
          series: nivel === 'iniciante' ? "20 min" : "30 min",
          repeticoes: "Cardio",
          videoId: "DfjpR6dzLVg",
          descricao: "Aquecimento Cardio (Corrida Estacionária)"
        });
      }

      treino[letra].exercicios = exerciciosTreino;
    }
  }

  // Salvar treino gerado
  localStorage.setItem('treinoGerado', JSON.stringify(treino));
  
  // Redirecionar ou recarregar página de treinos
  if (typeof mainView !== 'undefined' && mainView.router && mainView.router.currentRoute) {
  if (mainView.router.currentRoute.path === '/treinos/') {
    mainView.router.refreshPage();
  } else {
    mainView.router.navigate('/treinos/');
  }
  } else {
    window.location.href = '../pages/treinos.html';
}
}

function calcularDieta(peso, altura, idade, objetivo) {
  let tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
  let metaKcal;
  if (objetivo === 'emagrecer') metaKcal = tmb - 500;
  else if (objetivo === 'manter') metaKcal = tmb;
  else if (objetivo === 'ganhar') metaKcal = tmb + 500;
  else metaKcal = tmb; // caso padrão

  let proteina = (metaKcal * 0.3) / 4;
  let carbo = (metaKcal * 0.5) / 4;
  let gordura = (metaKcal * 0.2) / 9;

  return {
    metaKcal: Math.round(metaKcal),
    proteina: Math.round(proteina),
    carbo: Math.round(carbo),
    gordura: Math.round(gordura),
    objetivo: objetivo
  };
}

function gerarRefeicoes(objetivo) {
  const dietas = {
    emagrecer: {
      cafe: '2 ovos cozidos, 1 banana, 1 fatia de pão integral com pasta de amendoim',
      almoco: '100g de arroz integral, 150g de frango grelhado, salada verde, azeite',
      jantar: 'Omelete com legumes, chá sem açúcar'
    },
    manter: {
      cafe: 'Leite com café, 3 fatias de pão integral com queijo branco',
      almoco: '120g de arroz, 150g de carne magra, feijão e legumes',
      jantar: 'Macarrão integral com frango desfiado e fruta'
    },
    ganhar: {
      cafe: '4 ovos mexidos, 2 fatias de pão integral, 1 banana com aveia',
      almoco: '150g de arroz, 200g de carne, feijão, batata doce, salada',
      jantar: '150g de arroz integral, frango grelhado, legumes cozidos'
    }
  };
  return dietas[objetivo];
}

function salvarDadosUsuario(formData) {
  const nome = formData.get('nome');
  const idade = parseInt(formData.get('idade'));
  const altura = parseFloat(formData.get('altura'));
  const peso = parseFloat(formData.get('peso'));
  const objetivo = formData.get('objetivo');

  let metaKcal = 0;
  if (objetivo === 'emagrecer') metaKcal = peso * 20;
  else if (objetivo === 'manter') metaKcal = peso * 25;
  else if (objetivo === 'ganhar') metaKcal = peso * 30;

  const proteina = peso * 2; // g
  const carbo = (metaKcal * 0.5) / 4; // g
  const gordura = (metaKcal * 0.2) / 9; // g

  const dieta = {
    metaKcal: Math.round(metaKcal),
    proteina: Math.round(proteina),
    carbo: Math.round(carbo),
    gordura: Math.round(gordura)
  };

  const refeicoesPadrao = gerarRefeicoes(objetivo);
  localStorage.setItem('refeicoes', JSON.stringify(refeicoesPadrao));

  localStorage.setItem('usuario', JSON.stringify({ nome, idade, altura, peso, objetivo }));
  localStorage.setItem('dieta', JSON.stringify(dieta));

  mostrarResultado(dieta);
}

function mostrarResultado(dieta) {
  const refeicoes = JSON.parse(localStorage.getItem('refeicoes')) || {};
  const resultado = `
    <div>Meta Diária: <strong>${dieta.metaKcal} kcal</strong></div>
    <div>Proteínas: <strong>${dieta.proteina} g</strong></div>
    <div>Carboidratos: <strong>${dieta.carbo} g</strong></div>
    <div>Gorduras: <strong>${dieta.gordura} g</strong></div>
    <hr>
    <div><strong>Café da Manhã:</strong> ${refeicoes.cafe || 'Não definido'}</div>
    <div><strong>Almoço:</strong> ${refeicoes.almoco || 'Não definido'}</div>
    <div><strong>Jantar:</strong> ${refeicoes.jantar || 'Não definido'}</div>
  `;
  document.getElementById('info-dieta').innerHTML = resultado;
  document.getElementById('form-dados-usuario').style.display = 'none';
  document.getElementById('resultado-dieta').style.display = 'block';
}

function abrirEditorRefeicoes() {
  const refeicoesSalvas = JSON.parse(localStorage.getItem('refeicoes')) || {};
  document.querySelector('[name="cafe"]').value = refeicoesSalvas.cafe || '';
  document.querySelector('[name="almoco"]').value = refeicoesSalvas.almoco || '';
  document.querySelector('[name="jantar"]').value = refeicoesSalvas.jantar || '';
  app.popup.open('#popup-receitas');
}

function salvarRefeicoes(data) {
  const refeicoes = {
    cafe: data.get('cafe'),
    almoco: data.get('almoco'),
    jantar: data.get('jantar')
  };
  localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
  mostrarResultado(JSON.parse(localStorage.getItem('dieta')));
}

function voltarFormulario() {
  document.getElementById('form-dados-usuario').style.display = 'block';
  document.getElementById('resultado-dieta').style.display = 'none';
}

// Função para extrair ID do vídeo do YouTube
function extrairIdYouTube(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Função para mostrar vídeo do exercício
window.mostrarVideoExercicio = function(videoId, nomeExercicio) {
  const app = window.app;
  
  // Criar o popup
  app.popup.create({
    content: `
      <div class="popup">
        <div class="navbar">
          <div class="navbar-bg"></div>
          <div class="navbar-inner">
            <div class="title">${nomeExercicio}</div>
            <div class="right">
              <a class="link popup-close">
                <i class="ri-close-line"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="popup-inner">
          <div class="youtube-container">
            <iframe 
              src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&showinfo=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    `,
    on: {
      closed: function () {
        this.destroy();
      }
    }
  }).open();
};

// Adicionar event listener para mudança de tab
app.on('tabShow', function (el) {
  console.log('Tab shown:', el.id);
  if (el.id.startsWith('treino-')) {
    atualizarTreinos();
  }
});

// Funções para manipular refeições na página de dieta
function getRefeicoes() {
  return JSON.parse(localStorage.getItem('refeicoesDieta') || '[]');
}

function setRefeicoes(refeicoes) {
  localStorage.setItem('refeicoesDieta', JSON.stringify(refeicoes));
}

function renderizarRefeicoes() {
  const box = document.querySelector('.refeicoes-box');
  if (!box) return;
  const refeicoes = getRefeicoes();
  let html = '<h3>Refeições do Dia</h3>';
  refeicoes.forEach((ref, idx) => {
    html += `
      <div class="food-item">
        <div style="display: flex; align-items: center;">
          <i class="ri-restaurant-line" style="margin-right: 10px; color: #4da6ff;"></i>
          <span>${ref.nome}</span>
        </div>
        <div class="item-after">${ref.horario}</div>
        <i class="ri-edit-line edit-btn" data-index="${idx}" style="cursor:pointer;"></i>
        <i class="ri-delete-bin-line delete-btn" data-index="${idx}" style="cursor:pointer; margin-left:8px;"></i>
      </div>
    `;
  });
  html += `<button class="add-btn" id="btnAddRefeicao"><i class="ri-add-line"></i> Adicionar Refeição</button>`;
  box.innerHTML = html;
}

function abrirModalRefeicao(editIndex = null) {
  const modal = document.getElementById('modalRefeicao');
  const form = document.getElementById('formRefeicao');
  document.getElementById('modalTitulo').innerText = editIndex !== null ? 'Editar Refeição' : 'Adicionar Refeição';
  form.reset();
  document.getElementById('refeicaoIndex').value = editIndex !== null ? editIndex : '';
  if (editIndex !== null) {
    const refeicoes = getRefeicoes();
    const ref = refeicoes[editIndex];
    document.getElementById('nomeRefeicao').value = ref.nome;
    document.getElementById('horarioRefeicao').value = ref.horario;
    document.getElementById('descricaoRefeicao').value = ref.descricao;
  }
  modal.style.display = 'flex';
}

function fecharModalRefeicao() {
  document.getElementById('modalRefeicao').style.display = 'none';
}

// Eventos para página de dieta
if (window.location.pathname.includes('dieta.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    renderizarRefeicoes();

    // Abrir modal ao clicar em adicionar
    document.body.addEventListener('click', function(e) {
      if (e.target.closest('#btnAddRefeicao')) {
        abrirModalRefeicao();
      }
      if (e.target.classList.contains('edit-btn')) {
        const idx = e.target.getAttribute('data-index');
        abrirModalRefeicao(idx);
      }
      if (e.target.classList.contains('delete-btn')) {
        const idx = e.target.getAttribute('data-index');
        if (confirm('Deseja remover esta refeição?')) {
          const refeicoes = getRefeicoes();
          refeicoes.splice(idx, 1);
          setRefeicoes(refeicoes);
          renderizarRefeicoes();
        }
      }
    });

    // Fechar modal
    document.getElementById('cancelarRefeicao').onclick = fecharModalRefeicao;
    document.getElementById('modalRefeicao').onclick = function(e) {
      if (e.target === this) fecharModalRefeicao();
    };

    // Salvar refeição
    document.getElementById('formRefeicao').onsubmit = function(e) {
      e.preventDefault();
      const idx = document.getElementById('refeicaoIndex').value;
      const nome = document.getElementById('nomeRefeicao').value;
      const horario = document.getElementById('horarioRefeicao').value;
      const descricao = document.getElementById('descricaoRefeicao').value;
      let refeicoes = getRefeicoes();
      if (idx !== '') {
        refeicoes[idx] = { nome, horario, descricao };
      } else {
        refeicoes.push({ nome, horario, descricao });
      }
      setRefeicoes(refeicoes);
      fecharModalRefeicao();
      renderizarRefeicoes();
    };
  });
}

let maxExs = 8;
let intensidade = 'Moderada-Alta';
if (nivel === 'iniciante') {
  maxExs = 8;
  intensidade = 'Leve (foco em técnica e adaptação)';
}
if (nivel === 'intermediario') {
  maxExs = 6;
  intensidade = 'Moderada';
}
if (nivel === 'avancado') {
  maxExs = 8;
  intensidade = 'Alta';
} 
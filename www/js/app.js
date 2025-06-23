// Criar namespace global
window.EuPersonal = window.EuPersonal || {};

// Usar banco global carregado por exercicios.js
const exerciciosDB = window.exerciciosDB;

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
      path: '/dieta/',
      url: './pages/dieta.html',
    },
    {
      path: '/perfil/',
      url: './pages/perfil.html',
    },
    {
      path: '/treinos/',
      url: './pages/treinos.html',
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

// Adicionar listener para a inicialização da página de treinos
app.on('pageInit', function(page) {
    console.log('[DEBUG] pageInit disparado para a página:', page.name);

    if (page.name === 'treinos') {
        console.log('[DEBUG] Página de treinos reconhecida. Procurando o botão...');
        
        const generateBtn = page.$el.find('#generateBtn');
        
        if (generateBtn.length > 0) {
            console.log('[DEBUG] Botão "Gerar Treino" encontrado. Adicionando listener de clique.');
        } else {
            console.error('[DEBUG] ERRO: Botão "Gerar Treino" (#generateBtn) não foi encontrado na página.');
            return;
        }

        const emptyState = page.$el.find('#empty-state-container');
        const workoutView = page.$el.find('#workout-view-container');
        
        generateBtn.on('click', function(e) {
            console.log('[DEBUG] Botão "Gerar Treino" clicado.');
            e.preventDefault(); // Impede a navegação padrão do link

            // Capturar dados do formulário
            const objetivoSelect = page.$el.find('#objetivo-select');
            const nivelSelect = page.$el.find('#nivel-select');
            const frequenciaSelect = page.$el.find('#frequencia-select');

            const objetivoValue = objetivoSelect.val();
            const nivelText = nivelSelect.find('option:checked').text();
            const frequenciaText = frequenciaSelect.find('option:checked').text();
            
            console.log('[DEBUG] Dados do formulário:', { objetivo: objetivoValue, nivel: nivelText, frequencia: frequenciaText });

            // Atualizar a Ficha de Treino com os dados
            workoutView.find('.workout-card-header h2').text(`Treino ${objetivoValue}`);
            const workoutTags = workoutView.find('.workout-card-tags .chip');
            if (workoutTags.length > 0) workoutTags.eq(0).text(nivelText);
            if (workoutTags.length > 1) workoutTags.eq(1).text(frequenciaText);

            // Fechar o modal
            console.log('[DEBUG] Fechando o modal...');
            app.sheet.close('#training-sheet');

            // Esconder o estado vazio e mostrar a ficha de treino
            console.log('[DEBUG] Alternando a visualização...');
            emptyState.hide();
            workoutView.show();
            
            // Inicializar a barra de progresso
            console.log('[DEBUG] Atualizando a barra de progresso.');
            app.progressbar.set(workoutView.find('.progressbar'), 65);
        });
    }
}); 
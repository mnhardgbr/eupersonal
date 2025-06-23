// Banco de dados de exercícios
const exerciciosDB = {
  // Exercícios para membros superiores
  superiores: {
  peito: [
    {
        nome: "Flexão de Braço",
        grupo: "peito",
        equipamento: "Nenhum",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["emagrecimento", "ganho_massa", "definicao", "manutencao"],
        videoId: "IODxDxX7oi4",
        descricao: "Exercício composto para peitoral",
        variacoes: {
          iniciante: { series: 3, repeticoes: "8-10", descanso: "60s" },
          intermediario: { series: 4, repeticoes: "12-15", descanso: "45s" },
          avancado: { series: 4, repeticoes: "15-20", descanso: "30s" }
        }
    },
    {
        nome: "Flexão Diamante",
        grupo: "peito",
        equipamento: "Nenhum",
        nivel: ["intermediario", "avancado"],
        objetivo: ["ganho_massa", "definicao"],
        videoId: "J0DnG1_S92I",
        descricao: "Variação de flexão focando tríceps e peitoral interno",
        variacoes: {
          intermediario: { series: 3, repeticoes: "10-12", descanso: "60s" },
          avancado: { series: 4, repeticoes: "12-15", descanso: "45s" }
        }
    }
  ],
  costas: [
    {
        nome: "Barra Fixa",
        grupo: "costas",
        equipamento: "Barra",
        nivel: ["intermediario", "avancado"],
        objetivo: ["ganho_massa", "definicao"],
        videoId: "eGo4IYlbE5g",
        descricao: "Exercício composto para costas",
        variacoes: {
          intermediario: { series: 3, repeticoes: "8-10", descanso: "90s" },
          avancado: { series: 4, repeticoes: "10-12", descanso: "60s" }
        }
    },
    {
        nome: "Remada Curvada",
        grupo: "costas",
        equipamento: "Peso Livre",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["ganho_massa", "definicao", "manutencao"],
        videoId: "G8l_8chR5BE",
        descricao: "Exercício composto para costas",
        variacoes: {
          iniciante: { series: 3, repeticoes: "10-12", descanso: "90s" },
          intermediario: { series: 4, repeticoes: "12-15", descanso: "60s" },
          avancado: { series: 4, repeticoes: "15-20", descanso: "45s" }
        }
    }
  ],
  ombro: [
    {
        nome: "Elevação Lateral",
        grupo: "ombro",
        equipamento: "Peso Livre",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["ganho_massa", "definicao", "manutencao"],
        videoId: "3VcKaXpzqRo",
        descricao: "Exercício isolado para deltoide lateral",
        variacoes: {
          iniciante: { series: 3, repeticoes: "12-15", descanso: "60s" },
          intermediario: { series: 4, repeticoes: "15-20", descanso: "45s" },
          avancado: { series: 4, repeticoes: "20-25", descanso: "30s" }
        }
    }
  ],
  triceps: [
    {
        nome: "Tríceps Banco",
        grupo: "triceps",
        equipamento: "Banco",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["ganho_massa", "definicao", "manutencao"],
        videoId: "0326dy_-CzM",
        descricao: "Exercício isolado para tríceps",
        variacoes: {
          iniciante: { series: 3, repeticoes: "12-15", descanso: "60s" },
          intermediario: { series: 4, repeticoes: "15-20", descanso: "45s" },
          avancado: { series: 4, repeticoes: "20-25", descanso: "30s" }
        }
    }
  ],
  biceps: [
    {
        nome: "Rosca Direta",
        grupo: "biceps",
        equipamento: "Peso Livre",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["ganho_massa", "definicao", "manutencao"],
        videoId: "ykJmrZ5v0Oo",
        descricao: "Exercício isolado para bíceps",
        variacoes: {
          iniciante: { series: 3, repeticoes: "12-15", descanso: "60s" },
          intermediario: { series: 4, repeticoes: "15-20", descanso: "45s" },
          avancado: { series: 4, repeticoes: "20-25", descanso: "30s" }
        }
    }
    ]
  },

  // Exercícios para membros inferiores
  inferiores: {
  pernas: [
    {
      nome: "Agachamento Livre",
        grupo: "pernas",
        equipamento: "Nenhum",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["emagrecimento", "ganho_massa", "definicao", "manutencao"],
        videoId: "YaXPRqUwItQ",
        descricao: "Exercício composto para pernas",
        variacoes: {
          iniciante: { series: 3, repeticoes: "12-15", descanso: "90s" },
          intermediario: { series: 4, repeticoes: "15-20", descanso: "60s" },
          avancado: { series: 4, repeticoes: "20-25", descanso: "45s" }
        }
    },
    {
        nome: "Afundo",
        grupo: "pernas",
        equipamento: "Nenhum",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["emagrecimento", "ganho_massa", "definicao", "manutencao"],
        videoId: "3JA0UxJhJPM",
        descricao: "Exercício unilateral para pernas",
        variacoes: {
          iniciante: { series: 3, repeticoes: "10-12", descanso: "60s" },
          intermediario: { series: 4, repeticoes: "12-15", descanso: "45s" },
          avancado: { series: 4, repeticoes: "15-20", descanso: "30s" }
        }
    }
    ]
  },

  // Exercícios para core
  core: {
    abdomen: [
      {
        nome: "Prancha",
        grupo: "abdomen",
        equipamento: "Nenhum",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["emagrecimento", "definicao", "manutencao"],
        videoId: "pSHjTRCQxIw",
        descricao: "Exercício isométrico para core",
        variacoes: {
          iniciante: { series: 3, repeticoes: "30s", descanso: "60s" },
          intermediario: { series: 4, repeticoes: "45s", descanso: "45s" },
          avancado: { series: 4, repeticoes: "60s", descanso: "30s" }
        }
      },
    {
        nome: "Abdominal Remador",
        grupo: "abdomen",
        equipamento: "Nenhum",
        nivel: ["iniciante", "intermediario", "avancado"],
        objetivo: ["emagrecimento", "definicao", "manutencao"],
        videoId: "1we6YrzkqyY",
        descricao: "Exercício dinâmico para core",
        variacoes: {
          iniciante: { series: 3, repeticoes: "12-15", descanso: "60s" },
          intermediario: { series: 4, repeticoes: "15-20", descanso: "45s" },
          avancado: { series: 4, repeticoes: "20-25", descanso: "30s" }
        }
      }
    ]
  },

  // Exercícios de cardio
  cardio: [
    {
      nome: "Polichinelos",
      grupo: "cardio",
      equipamento: "Nenhum",
      nivel: ["iniciante", "intermediario", "avancado"],
      objetivo: ["emagrecimento", "definicao"],
      videoId: "iSSAk4XCsRA",
      descricao: "Exercício cardio de alta intensidade",
      variacoes: {
        iniciante: { series: 3, repeticoes: "30s", descanso: "60s" },
        intermediario: { series: 4, repeticoes: "45s", descanso: "45s" },
        avancado: { series: 4, repeticoes: "60s", descanso: "30s" }
      }
    },
    {
      nome: "Corrida Estacionária",
      grupo: "cardio",
      equipamento: "Nenhum",
      nivel: ["iniciante", "intermediario", "avancado"],
      objetivo: ["emagrecimento", "definicao"],
      videoId: "iSSAk4XCsRA",
      descricao: "Cardio de baixo impacto",
      variacoes: {
        iniciante: { series: 1, repeticoes: "10min", descanso: "0s" },
        intermediario: { series: 1, repeticoes: "20min", descanso: "0s" },
        avancado: { series: 1, repeticoes: "30min", descanso: "0s" }
      }
    }
  ],

  // Exercícios de mobilidade
  mobilidade: [
    {
      nome: "Mobilidade de Quadril",
      grupo: "mobilidade",
      equipamento: "Nenhum",
      nivel: ["iniciante", "intermediario", "avancado"],
      objetivo: ["emagrecimento", "ganho_massa", "definicao", "manutencao"],
      videoId: "iSSAk4XCsRA",
      descricao: "Exercício de mobilidade para quadril",
      variacoes: {
        iniciante: { series: 2, repeticoes: "10rep", descanso: "30s" },
        intermediario: { series: 3, repeticoes: "15rep", descanso: "20s" },
        avancado: { series: 3, repeticoes: "20rep", descanso: "15s" }
      }
    }
  ]
};

window.exerciciosDB = exerciciosDB; 
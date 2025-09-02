// Script para gerar os 27 treinos prontos
const objetivos = ['hipertrofia', 'emagrecimento', 'resistencia'];
const niveis = ['iniciante', 'intermediario', 'avancado'];
const frequencias = ['1-2', '3-4', '5+'];

function gerarTreinoPronto(objetivo, nivel, frequencia) {
  // Lógica de divisão
  let divisao = '';
  if (frequencia === '1-2') divisao = 'fullbody';
  else if (frequencia === '3-4') divisao = 'AB';
  else divisao = 'ABC';

  // Selecionar exercícios de peso corporal
  const db = window.exerciciosDB;
  const treino = {};
  if (db.superiores && db.superiores.peito) {
    treino['Peito'] = db.superiores.peito.filter(e => e.equipamento === 'Nenhum' && e.nivel.includes(nivel)).map(e => ({
      exercicio: e.nome,
      series: e.variacoes[nivel]?.series,
      repeticoes: e.variacoes[nivel]?.repeticoes
    }));
  }
  if (db.inferiores && db.inferiores.pernas) {
    treino['Pernas'] = db.inferiores.pernas.filter(e => e.equipamento === 'Nenhum' && e.nivel.includes(nivel)).map(e => ({
      exercicio: e.nome,
      series: e.variacoes[nivel]?.series,
      repeticoes: e.variacoes[nivel]?.repeticoes
    }));
  }
  if (db.core && db.core.abdomen) {
    treino['Abdômen'] = db.core.abdomen.filter(e => e.equipamento === 'Nenhum' && e.nivel.includes(nivel)).map(e => ({
      exercicio: e.nome,
      series: e.variacoes[nivel]?.series,
      repeticoes: e.variacoes[nivel]?.repeticoes
    }));
  }
  if (db.cardio) {
    treino['Cardio'] = db.cardio.filter(e => e.equipamento === 'Nenhum' && e.nivel.includes(nivel)).map(e => ({
      exercicio: e.nome,
      series: e.variacoes[nivel]?.series,
      repeticoes: e.variacoes[nivel]?.repeticoes
    }));
  }
  if (db.mobilidade) {
    treino['Mobilidade'] = db.mobilidade.filter(e => e.equipamento === 'Nenhum' && e.nivel.includes(nivel)).map(e => ({
      exercicio: e.nome,
      series: e.variacoes[nivel]?.series,
      repeticoes: e.variacoes[nivel]?.repeticoes
    }));
  }
  return {
    objetivo,
    nivel,
    frequencia,
    divisao,
    exercicios: treino
  };
}

const treinosProntos = [];
objetivos.forEach(objetivo => {
  niveis.forEach(nivel => {
    frequencias.forEach(frequencia => {
      treinosProntos.push(gerarTreinoPronto(objetivo, nivel, frequencia));
    });
  });
});

// Para exportar como arquivo JSON no navegador:
function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Chame downloadJSON(treinosProntos, 'treinos-prontos.json') no console para baixar o arquivo. 
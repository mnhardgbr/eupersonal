(function() {
    // Função para extrair o ID do vídeo de diferentes formatos de URL do YouTube
    function extrairIdVideo(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const exerciciosDB = [
        // --- Peito ---
        { id: 'peito_001', nome: 'Supino Reto com Halteres', grupo_muscular: 'Peito', url: 'https://youtu.be/fbupGf-T4KM' },
        { id: 'peito_002', nome: 'Supino Reto Barra', grupo_muscular: 'Peito', url: 'https://youtu.be/Kr2erpSyu3M' },
        { id: 'peito_003', nome: 'Supino Inclinado Barra', grupo_muscular: 'Peito', url: 'https://youtu.be/oZjIQN0YMX0' },
        { id: 'peito_004', nome: 'Supino inclinado 45º halteres', grupo_muscular: 'Peito', url: 'https://www.youtube.com/watch?v=F4Q1g2z8MWM' },
        { id: 'peito_005', nome: 'Crucifixo CrossOver', grupo_muscular: 'Peito', url: 'https://youtu.be/o90Pm6qTeNI' },
        { id: 'peito_006', nome: 'Crucifixo Voador', grupo_muscular: 'Peito', url: 'https://youtu.be/1D9x_U6PkY8' },
        { id: 'peito_007', nome: 'Paralela', grupo_muscular: 'Peito', url: 'https://youtu.be/vEjRJoitR4c' },

        // --- Costas ---
        { id: 'costas_001', nome: 'Barra Fixa (Pull up)', grupo_muscular: 'Costas', url: 'https://youtu.be/CKvMi8Shz9g' },
        { id: 'costas_002', nome: 'Puxador Frente Pegada Aberta', grupo_muscular: 'Costas', url: 'https://youtu.be/Xn-fIQw08q4' },
        { id: 'costas_003', nome: 'Remada Curvada Pegada Invertida', grupo_muscular: 'Costas', url: 'https://youtu.be/U0YF_ADlmPg' },
        { id: 'costas_004', nome: 'Remada Sentado com Triângulo', grupo_muscular: 'Costas', url: 'https://youtu.be/8N17XZVngdc' },
        { id: 'costas_005', nome: 'Remada Serrote', grupo_muscular: 'Costas', url: 'https://www.youtube.com/watch?v=f9KMbMtQA' },
        { id: 'costas_006', nome: 'Crucifixo Invertido', grupo_muscular: 'Costas', url: 'https://youtu.be/SNN6BftNts8' },

        // --- Ombros ---
        { id: 'ombros_001', nome: 'Desenvolvimento Barra', grupo_muscular: 'Ombros', url: 'https://youtu.be/o2LfBH1I8r8' },
        { id: 'ombros_002', nome: 'Desenvolvimento Halteres', grupo_muscular: 'Ombros', url: 'https://youtu.be/L-iQfHVeuVg' },
        { id: 'ombros_003', nome: 'Elevação Lateral com Halteres', grupo_muscular: 'Ombros', url: 'https://youtu.be/qDAoUOmdbi4' },
        { id: 'ombros_004', nome: 'Elevação Frontal com Halteres', grupo_muscular: 'Ombros', url: 'https://youtu.be/jhxLYSm_P-k' },
        { id: 'ombros_005', nome: 'Remada Alta', grupo_muscular: 'Ombros', url: 'https://youtu.be/QZD6vq22qJg' },

        // --- Tríceps ---
        { id: 'triceps_001', nome: 'Tríceps com Corda na Polia', grupo_muscular: 'Tríceps', url: 'https://youtu.be/gbnLZto6b0s' },
        { id: 'triceps_002', nome: 'Triceps Testa Barra', grupo_muscular: 'Tríceps', url: 'https://youtu.be/oqob5MHbzBc' },
        { id: 'triceps_003', nome: 'Triceps Mergulho no Banco', grupo_muscular: 'Tríceps', url: 'https://youtu.be/6EFb3xwsigQ' },
        { id: 'triceps_004', nome: 'Triceps Sup Reto Pegada Fechada', grupo_muscular: 'Tríceps', url: 'https://youtu.be/Q74ZvpW5PE8' },

        // --- Bíceps ---
        { id: 'biceps_001', nome: 'Rosca com Halteres', grupo_muscular: 'Bíceps', url: 'https://youtu.be/k31LK_VASok' },
        { id: 'biceps_002', nome: 'Rosca Concentrada', grupo_muscular: 'Bíceps', url: 'https://youtu.be/PcwdHVhWY3s' },
        { id: 'biceps_003', nome: 'Rosca direta barra', grupo_muscular: 'Bíceps', url: 'https://youtu.be/s4B8UW3BMqk' },
        { id: 'biceps_004', nome: 'Rosca Martelo', grupo_muscular: 'Bíceps', url: 'https://youtu.be/5vPGH1uTtbs' },

        // --- Pernas (Quadríceps e Posteriores) ---
        { id: 'pernas_001', nome: 'Agachamento Livre', grupo_muscular: 'Pernas', url: 'https://youtu.be/WLw3eRGkM5U' },
        { id: 'pernas_002', nome: 'Leg Press 45°', grupo_muscular: 'Pernas', url: 'https://youtu.be/9ruGCg0m9Tw' },
        { id: 'pernas_003', nome: 'Extensão de Joelhos', grupo_muscular: 'Pernas', url: 'https://youtu.be/lmK4wsg8GAM' },
        { id: 'pernas_004', nome: 'Flexão de Joelhos Deitado', grupo_muscular: 'Pernas', url: 'https://youtu.be/yiPqK5WMcNw' },
        { id: 'pernas_005', nome: 'Stiff com Barra', grupo_muscular: 'Pernas', url: 'https://www.youtube.com/watch?v=gE_qBwl72io' },
        { id: 'pernas_006', nome: 'Agachamento Búlgaro', grupo_muscular: 'Pernas', url: 'https://youtu.be/kBQ1krvKFBU?si=npwS0rtVh6R7VGTM' },

        // --- Glúteos ---
        { id: 'gluteos_001', nome: 'Elevação de Quadril', grupo_muscular: 'Glúteos', url: 'https://youtu.be/wNKb_CsSdg4' },
        { id: 'gluteos_002', nome: 'Glúteo no Cabo', grupo_muscular: 'Glúteos', url: 'https://youtu.be/ImCF9ki43tA' },
        { id: 'gluteos_003', nome: 'Hip Thrust', grupo_muscular: 'Glúteos', url: 'https://www.youtube.com/watch?v=5S8SApGU_Lk' },

        // --- Panturrilhas ---
        { id: 'pantu_001', nome: 'Flexão Plantar em pé', grupo_muscular: 'Panturrilhas', url: 'https://youtu.be/r7OC-a9dCd4' },
        { id: 'pantu_002', nome: 'Flexão Plantar Sentado', grupo_muscular: 'Panturrilhas', url: 'https://youtu.be/Nap62yku2ks' },

        // --- Abdômen ---
        { id: 'abdomen_001', nome: 'Abdominal Supra', grupo_muscular: 'Abdômen', url: 'https://youtu.be/mfkfUkj24co' },
        { id: 'abdomen_002', nome: 'Prancha Frontal', grupo_muscular: 'Abdômen', url: 'https://youtu.be/a6JT9hOy5Rs' }
    ];

    // Adiciona o videoId extraído a cada exercício
    const dbComVideoId = exerciciosDB.map(ex => ({ ...ex, videoId: extrairIdVideo(ex.url) }));

    // Expor o banco de dados para o escopo global
    window.exerciciosDB = dbComVideoId;
})(); 
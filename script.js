// ========================================
// SISTEMA DE CONSULTORIA COM 5 PERGUNTAS
// ========================================

// Dados da consultoria
let consultoriaData = {
    nome: '',
    negocio: '',
    objetivo: '',
    prazo: '',
    orcamento: ''
};

// Controle do fluxo
let perguntaAtual = 0;
const totalPerguntas = 5;

// Estrutura das 5 perguntas
const perguntas = [
    {
        id: 'nome',
        tipo: 'texto',
        pergunta: '👋 Olá! Sou a consultora virtual da Mivora Digital. Para começar, qual é o seu nome?',
        placeholder: 'Digite seu nome...'
    },
    {
        id: 'negocio',
        tipo: 'texto',
        pergunta: (nome) => `Prazer em conhecer você, ${nome}! 😊 Agora me conta: qual é o seu negócio ou área de atuação?`,
        placeholder: 'Ex: Loja de roupas, Consultoria, Restaurante...'
    },
    {
        id: 'objetivo',
        tipo: 'opcoes',
        pergunta: 'Perfeito! Qual é o principal objetivo do seu site?',
        opcoes: [
            'Vender produtos online',
            'Divulgar meus serviços',
            'Capturar leads e contatos',
            'Criar autoridade no mercado'
        ]
    },
    {
        id: 'prazo',
        tipo: 'opcoes',
        pergunta: 'Entendi! E qual o prazo ideal para ter o site pronto?',
        opcoes: [
            'Urgente (15-30 dias)',
            'Normal (30-60 dias)',
            'Sem pressa (mais de 60 dias)'
        ]
    },
    {
        id: 'orcamento',
        tipo: 'opcoes',
        pergunta: 'Última pergunta! Qual é o seu orçamento para investir no projeto?',
        opcoes: [
            'Até R$ 1.500',
            'R$ 1.500 - R$ 3.000',
            'R$ 3.000 - R$ 5.000',
            'Acima de R$ 5.000'
        ]
    }
];

// Elementos do DOM
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const inputArea = document.getElementById('input-area');
const opcoesArea = document.getElementById('opcoes-area');
const resultadoArea = document.getElementById('resultado-area');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// ========================================
// FUNÇÕES DO CHAT
// ========================================

function addMensagem(texto, tipo) {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.classList.add('chat-message', `${tipo}-message`);
    mensagemDiv.textContent = texto;
    chatContainer.appendChild(mensagemDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function atualizarProgresso() {
    const progresso = ((perguntaAtual + 1) / totalPerguntas) * 100;
    progressFill.style.width = progresso + '%';
    progressText.textContent = `Pergunta ${perguntaAtual + 1} de ${totalPerguntas}`;
}

function mostrarPergunta() {
    if (perguntaAtual >= totalPerguntas) {
        finalizarConsultoria();
        return;
    }

    const pergunta = perguntas[perguntaAtual];
    let textoPergunta = pergunta.pergunta;

    // Se a pergunta é uma função (usa dados anteriores)
    if (typeof textoPergunta === 'function') {
        textoPergunta = textoPergunta(consultoriaData.nome);
    }

    addMensagem(textoPergunta, 'agent');

    if (pergunta.tipo === 'texto') {
        mostrarInputTexto(pergunta.placeholder);
    } else if (pergunta.tipo === 'opcoes') {
        mostrarOpcoes(pergunta.opcoes);
    }

    atualizarProgresso();
}

function mostrarInputTexto(placeholder) {
    inputArea.style.display = 'flex';
    opcoesArea.style.display = 'none';
    chatInput.placeholder = placeholder;
    chatInput.value = '';
    chatInput.focus();
}

function mostrarOpcoes(opcoes) {
    inputArea.style.display = 'none';
    opcoesArea.style.display = 'flex';
    opcoesArea.innerHTML = '';

    opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.classList.add('opcao-btn', 'btn-secondary', 'btn-small');
        btn.textContent = opcao;
        btn.onclick = () => selecionarOpcao(opcao);
        opcoesArea.appendChild(btn);
    });
}

function processarResposta(resposta) {
    if (!resposta || resposta.trim() === '') return;

    addMensagem(resposta, 'user');

    const pergunta = perguntas[perguntaAtual];
    consultoriaData[pergunta.id] = resposta;

    perguntaAtual++;
    
    setTimeout(() => {
        mostrarPergunta();
    }, 500);
}

function selecionarOpcao(opcao) {
    processarResposta(opcao);
}

function enviarResposta() {
    const resposta = chatInput.value.trim();
    if (resposta) {
        processarResposta(resposta);
        chatInput.value = '';
    }
}

// ========================================
// SISTEMA DE RECOMENDAÇÃO INTELIGENTE
// ========================================

function finalizarConsultoria() {
    inputArea.style.display = 'none';
    opcoesArea.style.display = 'none';

    // Atualizar progresso para 100%
    progressFill.style.width = '100%';
    progressText.textContent = 'Consultoria Concluída! ✅';

    addMensagem('Analisando suas respostas... 🤔', 'agent');

    setTimeout(() => {
        addMensagem('Pronto! Encontrei o plano perfeito para você! 🎯', 'agent');
        
        setTimeout(() => {
            const planoRecomendado = recomendarPlano();
            mostrarResultado(planoRecomendado);
        }, 1000);
    }, 1500);
}

function recomendarPlano() {
    const orcamento = consultoriaData.orcamento;
    const prazo = consultoriaData.prazo;
    const objetivo = consultoriaData.objetivo;

    // Lógica de recomendação baseada no orçamento
    if (orcamento.includes('Até R$ 1.500')) {
        return {
            nome: 'Plano Básico',
            preco: 'R$ 1.200',
            descricao: 'Perfeito para quem está começando! Um site moderno e responsivo que cabe no seu orçamento.',
            features: [
                'Site responsivo e moderno',
                'Até 5 páginas profissionais',
                'Formulário de contato',
                'Integração com redes sociais',
                'SSL e segurança incluídos',
                'Suporte técnico por 30 dias'
            ],
            valor: 1200
        };
    } else if (orcamento.includes('R$ 1.500 - R$ 3.000')) {
        return {
            nome: 'Plano Premium',
            preco: 'R$ 2.500',
            descricao: 'O melhor custo-benefício! Site completo com animações modernas e recursos avançados.',
            features: [
                'Tudo do Plano Básico',
                'Até 15 páginas',
                'Animações modernas (GSAP)',
                'Painel administrativo (CMS)',
                'Otimização de SEO completa',
                'Suporte prioritário por 90 dias',
                'Google Analytics integrado'
            ],
            valor: 2500
        };
    } else if (orcamento.includes('R$ 3.000 - R$ 5.000') || orcamento.includes('Acima de R$ 5.000')) {
        return {
            nome: 'Plano Enterprise',
            preco: 'Sob Consulta',
            descricao: 'Solução 100% customizada para o seu negócio. Sem limites de criatividade!',
            features: [
                'Tudo do Plano Premium',
                'Páginas ilimitadas',
                'Sistema totalmente customizado',
                'Integrações avançadas (APIs, pagamentos)',
                'Design exclusivo e único',
                'Suporte VIP 24/7',
                'Consultoria estratégica incluída'
            ],
            valor: 0
        };
    }

    // Fallback para o plano básico
    return {
        nome: 'Plano Básico',
        preco: 'R$ 1.200',
        descricao: 'Ideal para começar sua presença digital com qualidade!',
        features: [
            'Site responsivo e moderno',
            'Até 5 páginas profissionais',
            'Suporte básico incluído'
        ],
        valor: 1200
    };
}

function mostrarResultado(plano) {
    document.getElementById('resultado-plano').textContent = plano.nome;
    document.getElementById('resultado-preco').textContent = plano.preco;
    document.getElementById('resultado-descricao').textContent = plano.descricao;

    const featuresList = document.getElementById('resultado-features');
    featuresList.innerHTML = '';
    plano.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    document.getElementById('btn-escolher-plano').onclick = () => {
        selecionarPlano(plano.nome, plano.valor);
    };

    resultadoArea.style.display = 'block';
    resultadoArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function recomecarConsultoria() {
    // Resetar dados
    consultoriaData = {
        nome: '',
        negocio: '',
        objetivo: '',
        prazo: '',
        orcamento: ''
    };
    perguntaAtual = 0;

    // Limpar chat
    chatContainer.innerHTML = '';
    resultadoArea.style.display = 'none';

    // Resetar progresso
    progressFill.style.width = '0%';
    progressText.textContent = 'Pergunta 1 de 5';

    // Iniciar novamente
    iniciarConsultoria();
}

function iniciarConsultoria() {
    mostrarPergunta();
}

// ========================================
// FUNÇÕES DOS PLANOS (SEÇÃO PRINCIPAL)
// ========================================

function selecionarPlano(nomePlano, preco) {
    const phone = '5511999999999';
    let mensagem = '';
    
    if (preco === 0 || nomePlano.includes('Enterprise')) {
        mensagem = `Olá! Gostaria de mais informações sobre o ${nomePlano}.`;
    } else {
        mensagem = `Olá! Gostaria de contratar o ${nomePlano} (R$ ${preco}).`;
    }
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// ========================================
// MODAL DE DETALHES DOS PLANOS
// ========================================

const planosDetalhes = {
    basico: {
        titulo: 'Plano Básico - Detalhes',
        descricao: 'Ideal para quem está começando e precisa de uma presença online profissional e responsiva.',
        features: [
            'Design Moderno e Responsivo',
            'Até 5 Páginas (Home, Sobre, Serviços, Contato, Política)',
            'Formulário de Contato Simples',
            'Integração com Redes Sociais',
            'Otimização de Velocidade Básica',
            'Suporte Técnico Básico (30 dias)'
        ]
    },
    premium: {
        titulo: 'Plano Premium - Detalhes',
        descricao: 'O melhor custo-benefício para quem busca um site com alto impacto visual e interatividade.',
        features: [
            'Tudo do Plano Básico',
            'Até 15 Páginas',
            'Animações Modernas (GSAP)',
            'Painel Administrativo (CMS Simples)',
            'Otimização de SEO Inicial',
            'Suporte Prioritário (90 dias)',
            'Integração com Google Analytics'
        ]
    }
};

function abrirModal(plano) {
    const modal = document.getElementById('modal-detalhes');
    const detalhes = planosDetalhes[plano];
    
    document.getElementById('modal-titulo').textContent = detalhes.titulo;
    document.getElementById('modal-descricao').textContent = detalhes.descricao;
    
    const ul = document.getElementById('modal-features');
    ul.innerHTML = '';
    detalhes.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        ul.appendChild(li);
    });
    
    modal.style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal-detalhes').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-detalhes');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// INICIALIZAÇÃO E EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Forçar scroll para o topo ao carregar a página
    window.scrollTo(0, 0);
    
    // Iniciar consultoria
    iniciarConsultoria();

    // Event listener para o botão de enviar
    chatSendBtn.addEventListener('click', enviarResposta);

    // Event listener para Enter no input
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviarResposta();
        }
    });

    // Animações de fade-in ao rolar a página
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Garantir que sempre inicie no topo, mesmo com cache do navegador
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);
});

// Prevenir scroll automático ao navegar de volta
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

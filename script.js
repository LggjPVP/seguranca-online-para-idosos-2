// Estado Global da Aplicação
let estaComTextoGrande = false;

/**
 * Alterna o tamanho do texto entre o tamanho padrão e grande
 */
function alternarTamanhoTexto() {
    const corpo = document.getElementById('corpo-aplicacao');
    const rotulo = document.getElementById('rotulo-tamanho-texto');
    
    estaComTextoGrande = !estaComTextoGrande;

    if (estaComTextoGrande) {
        corpo.classList.add('texto-grande');
        rotulo.innerText = 'Tamanho Normal';
    } else {
        corpo.classList.remove('texto-grande');
        rotulo.innerText = 'Aumentar Letra';
    }
}

/**
 * Ativa ou desativa o modo de alto contraste para melhor visibilidade
 */
function alternarAltoContraste() {
    const corpo = document.getElementById('corpo-aplicacao');
    corpo.classList.toggle('alto-contraste');
}

/**
 * Utiliza a síntese de voz do navegador para ler o texto explicativo
 * @param {string} textoParaLer - Texto a ser reproduzido em áudio
 */
function ouvirExplicacao(textoParaLer) {
    if ('speechSynthesis' in window) {
        // Interrompe leituras anteriores em curso
        window.speechSynthesis.cancel();

        const pronuncia = new SpeechSynthesisUtterance(textoParaLer);
        pronuncia.lang = 'pt-PT'; // Configuração para Português
        pronuncia.rate = 0.85;    // Ritmo ligeiramente pausado para maior clareza
        
        window.speechSynthesis.speak(pronuncia);
    } else {
        // Mensagem de aviso se o navegador não suportar áudio
        const feedback = document.getElementById('resposta-feedback-quiz');
        feedback.style.display = 'block';
        feedback.style.backgroundColor = '#fef2f2';
        feedback.style.color = '#991b1b';
        feedback.innerHTML = 'O seu navegador não suporta a função de leitura por voz.';
    }
}

/**
 * Avalia a opção selecionada no simulador e exibe o resultado
 * @param {boolean} ehOpcaoCorreta - Booleano que indica se a resposta está correta
 */
function verificarRespostaQuiz(ehOpcaoCorreta) {
    const caixaFeedback = document.getElementById('resposta-feedback-quiz');
    caixaFeedback.style.display = 'block';

    if (ehOpcaoCorreta) {
        caixaFeedback.style.backgroundColor = '#d1fae5';
        caixaFeedback.style.color = '#065f46';
        caixaFeedback.style.border = '1px solid #a7f3d0';
        caixaFeedback.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-circle-check" style="font-size: 2rem; color: #059669;"></i>
                <div>
                    <h4 style="font-weight: 700; font-size: 1.1rem; margin: 0;">Excelente escolha! Parabéns!</h4>
                    <p style="margin: 0.25rem 0 0 0;">Nunca se deve clicar em hiperligações enviadas por SMS bancárias. O seu banco nunca pede atualizações dessa forma.</p>
                </div>
            </div>
        `;
    } else {
        caixaFeedback.style.backgroundColor = '#fee2e2';
        caixaFeedback.style.color = '#991b1b';
        caixaFeedback.style.border = '1px solid #fca5a5';
        caixaFeedback.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-circle-xmark" style="font-size: 2rem; color: #dc2626;"></i>
                <div>
                    <h4 style="font-weight: 700; font-size: 1.1rem; margin: 0;">Cuidado! Essa opção é perigosa.</h4>
                    <p style="margin: 0.25rem 0 0 0;">Ao clicar no link ou enviar dados, pode estar a dar acesso ao seu dinheiro a burlões. A resposta correta é a <strong>Opção B</strong>.</p>
                </div>
            </div>
        `;
    }
}

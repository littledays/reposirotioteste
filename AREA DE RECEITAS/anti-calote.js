// ========================================
// SISTEMA ANTI-CALOTE (PERSISTENTE + CHAVE MESTRA)
// Cozinha de Respeito - Área de Membros
// ========================================

(function () {
    'use strict';

    // --- CHAVE MESTRA DE SEGURANÇA ---
    // Libera a visualização do site. Se este script for removido,
    // o site permanecerá invisível devido ao CSS (body { opacity: 0 }).
    function liberarSite() {
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
    }

    // Executa a liberação imediatamente ao carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', liberarSite);
    } else {
        liberarSite();
    }
    // ----------------------------------

    // Configurações
    const TEMPO_TOTAL_MINUTOS = 3;
    const TEMPO_TOTAL_MS = TEMPO_TOTAL_MINUTOS * 60 * 1000;
    const CHAVE_PIX = 'pix.pagamentosltda@outlook.com';
    const BENEFICIARIO = 'Guilherme Dias';

    // Verificar se já pagou
    const jaPagou = localStorage.getItem('cozinha_pagamento_confirmado');

    if (jaPagou === 'true') {
        return; // Usuário já pagou, vida normal
    }

    // Gerenciar Tempo de Acesso
    let inicioAcesso = localStorage.getItem('cozinha_inicio_acesso');

    // Se não tem registro de início, grava agora (primeiro acesso)
    if (!inicioAcesso) {
        inicioAcesso = Date.now();
        localStorage.setItem('cozinha_inicio_acesso', inicioAcesso);
    } else {
        inicioAcesso = parseInt(inicioAcesso);
    }

    let timerInterval;

    // Criar mini notificação de timer
    function criarMiniTimer() {
        if (document.getElementById('mini-timer')) return;

        const miniTimer = document.createElement('div');
        miniTimer.id = 'mini-timer';
        miniTimer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #9C7A2B, #C4A053);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            box-shadow: 0 4px 15px rgba(156, 122, 43, 0.3);
            z-index: 9998;
            font-family: 'Lato', sans-serif;
            font-weight: 600;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: pulseTimer 2s infinite;
            transition: opacity 0.3s;
        `;
        miniTimer.innerHTML = `
            <i class="fa-solid fa-clock"></i>
            <span id="timer-display">Calculando...</span>
        `;
        document.body.appendChild(miniTimer);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulseTimer {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }

    // Lógica principal do Timer
    function verificarTempo() {
        const agora = Date.now();
        const tempoDecorrido = agora - inicioAcesso;
        const tempoRestanteMs = TEMPO_TOTAL_MS - tempoDecorrido;

        if (tempoRestanteMs <= 0) {
            clearInterval(timerInterval);
            mostrarPopupPagamento();
            const display = document.getElementById('timer-display');
            if (display) display.textContent = "00:00";
        } else {
            const segundosTotais = Math.floor(tempoRestanteMs / 1000);
            const minutos = Math.floor(segundosTotais / 60);
            const segundos = segundosTotais % 60;

            const display = document.getElementById('timer-display');
            if (display) {
                display.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
            }

            const overlay = document.getElementById('popup-pagamento-overlay');
            if (overlay && tempoRestanteMs > 1000) {
                overlay.remove();
                document.body.style.overflow = 'auto';
            }
        }
    }

    // Criar popup de pagamento
    function mostrarPopupPagamento() {
        if (document.getElementById('popup-pagamento-overlay')) return;

        const miniTimer = document.getElementById('mini-timer');
        if (miniTimer) miniTimer.style.display = 'none';

        const overlay = document.createElement('div');
        overlay.id = 'popup-pagamento-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 99999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
            backdrop-filter: blur(5px);
        `;

        const popup = document.createElement('div');
        popup.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            text-align: center;
            animation: slideUp 0.4s ease;
            position: relative;
        `;

        popup.innerHTML = `
            <div style="margin-bottom: 20px;">
                <i class="fa-solid fa-lock" style="font-size: 4rem; color: #9C7A2B;"></i>
            </div>
            
            <h2 style="font-family: 'Playfair Display', serif; color: #9C7A2B; font-size: 2rem; margin-bottom: 15px;">
                ACESSO BLOQUEADO
            </h2>
            
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6;">
                Seu tempo de degustação acabou.<br>Para continuar acessando, realize o pagamento via PIX.
            </p>

            <div style="background: #FAF3E0; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                <p style="color: #9C7A2B; font-weight: 700; margin-bottom: 10px; font-size: 0.9rem;">
                    BENEFICIÁRIO
                </p>
                <p style="color: #333; font-size: 1.1rem; font-weight: 600; margin-bottom: 20px;">
                    ${BENEFICIARIO}
                </p>

                <p style="color: #9C7A2B; font-weight: 700; margin-bottom: 10px; font-size: 0.9rem;">
                    CHAVE PIX
                </p>
                <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 15px;">
                    <span id="chave-pix-display" style="color: #333; font-family: monospace; font-size: 0.95rem; word-break: break-all;">
                        ${CHAVE_PIX}
                    </span>
                </div>

                <button id="btn-copiar-pix" style="
                    width: 100%;
                    background: #9C7A2B;
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                ">
                    <i class="fa-solid fa-copy"></i>
                    COPIAR CHAVE PIX
                </button>
            </div>

            <p style="color: #999; font-size: 0.85rem; line-height: 1.5;">
                Após enviar o comprovante, o seu acesso será liberado em até 2 minutos.
            </p>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        document.getElementById('btn-copiar-pix').addEventListener('click', function () {
            navigator.clipboard.writeText(CHAVE_PIX).then(function () {
                const btn = document.getElementById('btn-copiar-pix');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> CHAVE COPIADA!';
                btn.style.background = '#4CAF50';
                mostrarNotificacao('✅ Chave PIX copiada com sucesso!');
                setTimeout(function () {
                    btn.innerHTML = '<i class="fa-solid fa-copy"></i> COPIAR CHAVE PIX';
                    btn.style.background = '#9C7A2B';
                }, 3000);
            });
        });

        document.body.style.overflow = 'hidden';
    }

    function mostrarNotificacao(mensagem) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 100000;
            font-family: 'Lato', sans-serif;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        notif.textContent = mensagem;
        document.body.appendChild(notif);

        setTimeout(function () {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(function () {
                notif.remove();
            }, 300);
        }, 3000);
    }

    function bloquearDownloads() {
        if (window.location.pathname.includes('downloads.html')) {
            document.body.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #FAF3E0; font-family: 'Lato', sans-serif; text-align: center; padding: 20px;">
                    <div>
                        <i class="fa-solid fa-lock" style="font-size: 5rem; color: #9C7A2B; margin-bottom: 30px;"></i>
                        <h1 style="color: #9C7A2B; font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 20px;">
                            Acesso Negado
                        </h1>
                        <p style="color: #666; font-size: 1.2rem; margin-bottom: 30px; line-height: 1.6; max-width: 500px; margin-left: auto; margin-right: auto;">
                            Esta área está disponível apenas para membros com pagamento confirmado.
                        </p>
                        <a href="index.html" style="
                            display: inline-block;
                            background: #9C7A2B;
                            color: white;
                            padding: 15px 40px;
                            border-radius: 8px;
                            text-decoration: none;
                            font-weight: 700;
                            font-size: 1.1rem;
                            transition: all 0.3s ease;
                        ">
                            <i class="fa-solid fa-arrow-left"></i> Voltar ao Início
                        </a>
                    </div>
                </div>
            `;
        }
    }

    function iniciar() {
        bloquearDownloads();
        criarMiniTimer();
        verificarTempo();
        timerInterval = setInterval(verificarTempo, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }

})();

// ========================================
// SISTEMA ANTI-PRINT
// Cozinha de Respeito - Área de Membros
// ========================================

(function () {
    'use strict';

    // 1. DETECTAR TENTATIVA DE IMPRESSÃO
    window.addEventListener('beforeprint', function () {
        bloquearImpressao();
    });

    window.addEventListener('afterprint', function () {
        restaurarConteudo();
    });

    // 2. DETECTAR CTRL+P
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 80) {
            e.preventDefault();
            mostrarAlertaImpressao();
            return false;
        }
    });

    // 3. CRIAR CSS PARA IMPRESSÃO
    const styleImpressao = document.createElement('style');
    styleImpressao.textContent = `
        @media print {
            /* Esconde todo o conteúdo */
            body * {
                display: none !important;
            }
            
            /* Mostra apenas a mensagem de bloqueio */
            body::before {
                content: "🔒 IMPRESSÃO BLOQUEADA" !important;
                display: block !important;
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                font-size: 3rem !important;
                color: #9C7A2B !important;
                font-family: 'Playfair Display', serif !important;
                text-align: center !important;
                font-weight: 700 !important;
            }
            
            body::after {
                content: "Este conteúdo é protegido por direitos autorais.\\A Para obter uma cópia autorizada, entre em contato com Cozinha de Respeito." !important;
                white-space: pre !important;
                display: block !important;
                position: fixed !important;
                top: 60% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                font-size: 1.2rem !important;
                color: #666 !important;
                font-family: 'Lato', sans-serif !important;
                text-align: center !important;
                max-width: 600px !important;
                line-height: 1.8 !important;
            }
            
            /* Marca d'água em todas as páginas */
            @page {
                margin: 0;
            }
        }
        
        /* Marca d'água invisível na tela, visível na impressão */
        .watermark-print {
            display: none;
        }
        
        @media print {
            .watermark-print {
                display: block !important;
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) rotate(-45deg) !important;
                font-size: 8rem !important;
                color: rgba(156, 122, 43, 0.1) !important;
                font-weight: 900 !important;
                z-index: 99999 !important;
                pointer-events: none !important;
                white-space: nowrap !important;
            }
        }
    `;
    document.head.appendChild(styleImpressao);

    // 4. ADICIONAR MARCA D'ÁGUA PARA IMPRESSÃO
    const watermark = document.createElement('div');
    watermark.className = 'watermark-print';
    watermark.textContent = 'COZINHA DE RESPEITO - CÓPIA NÃO AUTORIZADA';
    document.body.appendChild(watermark);

    // 5. BACKUP DO CONTEÚDO ORIGINAL
    let conteudoOriginal = null;

    function bloquearImpressao() {
        // Salva o conteúdo original
        conteudoOriginal = document.body.innerHTML;

        // Substitui por mensagem de bloqueio
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; padding: 40px;">
                <div>
                    <div style="font-size: 5rem; color: #9C7A2B; margin-bottom: 30px;">🔒</div>
                    <h1 style="font-family: 'Playfair Display', serif; color: #9C7A2B; font-size: 3rem; margin-bottom: 20px;">
                        IMPRESSÃO BLOQUEADA
                    </h1>
                    <p style="font-family: 'Lato', sans-serif; color: #666; font-size: 1.3rem; line-height: 1.8; max-width: 600px; margin: 0 auto;">
                        Este conteúdo é protegido por direitos autorais.<br><br>
                        Para obter uma cópia autorizada, entre em contato com:<br>
                        <strong style="color: #9C7A2B;">Cozinha de Respeito</strong>
                    </p>
                </div>
            </div>
        `;
    }

    function restaurarConteudo() {
        if (conteudoOriginal) {
            document.body.innerHTML = conteudoOriginal;
            conteudoOriginal = null;

            // Recarrega a página para restaurar os scripts
            setTimeout(function () {
                location.reload();
            }, 100);
        }
    }

    function mostrarAlertaImpressao() {
        const alerta = document.createElement('div');
        alerta.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 100000;
            text-align: center;
            max-width: 500px;
            animation: slideUp 0.3s ease;
        `;

        alerta.innerHTML = `
            <div style="font-size: 4rem; color: #9C7A2B; margin-bottom: 20px;">🔒</div>
            <h2 style="font-family: 'Playfair Display', serif; color: #9C7A2B; font-size: 2rem; margin-bottom: 15px;">
                Impressão Bloqueada
            </h2>
            <p style="font-family: 'Lato', sans-serif; color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
                Este conteúdo é protegido por direitos autorais e não pode ser impresso.
            </p>
            <button id="btn-fechar-alerta" style="
                background: #9C7A2B;
                color: white;
                border: none;
                padding: 15px 40px;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                Entendi
            </button>
        `;

        // Overlay escuro
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 99999;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(alerta);

        // Botão fechar
        document.getElementById('btn-fechar-alerta').addEventListener('click', function () {
            overlay.remove();
            alerta.remove();
        });

        // Fechar ao clicar no overlay
        overlay.addEventListener('click', function () {
            overlay.remove();
            alerta.remove();
        });
    }

    // 6. DETECTAR PRINT SCREEN (limitado, mas adiciona camada extra)
    document.addEventListener('keyup', function (e) {
        // Print Screen
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('');
            mostrarNotificacao('⚠️ Captura de tela detectada e bloqueada');
        }
    });

    // 7. BLOQUEAR ATALHOS DE SCREENSHOT NO WINDOWS
    document.addEventListener('keydown', function (e) {
        // Windows + Shift + S (Ferramenta de Captura)
        if (e.key === 's' && e.shiftKey && (e.metaKey || e.key === 'Meta')) {
            e.preventDefault();
            mostrarNotificacao('⚠️ Captura de tela bloqueada');
            return false;
        }
    });

    function mostrarNotificacao(mensagem) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #9C7A2B;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 100001;
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

    // 8. ADICIONAR ANIMAÇÕES
    const animacoes = document.createElement('style');
    animacoes.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translate(-50%, -40%); opacity: 0; }
            to { transform: translate(-50%, -50%); opacity: 1; }
        }
    `;
    document.head.appendChild(animacoes);

})();

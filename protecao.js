// ========================================
// SISTEMA DE PROTEÇÃO ANTI-PLÁGIO
// Cozinha de Respeito - Área de Membros
// VERSÃO MOBILE-FRIENDLY
// ========================================

(function () {
    'use strict';

    // Detectar se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 1. DESABILITAR BOTÃO DIREITO DO MOUSE (apenas desktop)
    if (!isMobile) {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            mostrarAlerta('⚠️ Ação bloqueada por segurança');
            return false;
        }, false);
    }

    // 2. DESABILITAR TECLAS DE ATALHO PERIGOSAS (apenas desktop)
    if (!isMobile) {
        document.addEventListener('keydown', function (e) {
            // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+Shift+C
            if (
                e.keyCode === 123 || // F12
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
                (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
                (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
                (e.ctrlKey && e.shiftKey && e.keyCode === 67) // Ctrl+Shift+C
            ) {
                e.preventDefault();
                mostrarAlerta('⚠️ Atalho bloqueado por segurança');
                return false;
            }
        });
    }

    // 3. DETECTAR DEVTOOLS ABERTO (APENAS DESKTOP - DESABILITADO NO MOBILE)
    if (!isMobile) {
        let devtoolsOpen = false;
        const threshold = 160;

        setInterval(function () {
            if (
                window.outerWidth - window.innerWidth > threshold ||
                window.outerHeight - window.innerHeight > threshold
            ) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    document.body.innerHTML = `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #FAF3E0; font-family: 'Lato', sans-serif; text-align: center; padding: 20px;">
                            <div>
                                <i class="fa-solid fa-shield-halved" style="font-size: 4rem; color: #9C7A2B; margin-bottom: 20px;"></i>
                                <h1 style="color: #9C7A2B; font-family: 'Playfair Display', serif; margin-bottom: 15px;">Área Protegida</h1>
                                <p style="color: #666; font-size: 1.1rem; margin-bottom: 20px;">Esta área é protegida contra inspeção.<br>Por favor, feche as ferramentas de desenvolvedor.</p>
                                <button onclick="location.reload()" style="background: #9C7A2B; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: 600;">Recarregar Página</button>
                            </div>
                        </div>
                    `;
                }
            } else {
                devtoolsOpen = false;
            }
        }, 1000); // Aumentado para 1 segundo para evitar falsos positivos
    }

    // 4. DESABILITAR SELEÇÃO DE TEXTO (suave - permite seleção em inputs)
    document.addEventListener('selectstart', function (e) {
        // Permite seleção em inputs e textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        e.preventDefault();
        return false;
    });

    // 5. DESABILITAR ARRASTAR E SOLTAR
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // 6. PROTEÇÃO CONTRA PRINT SCREEN (apenas desktop)
    if (!isMobile) {
        document.addEventListener('keyup', function (e) {
            if (e.key === 'PrintScreen') {
                navigator.clipboard.writeText('');
                mostrarAlerta('⚠️ Captura de tela detectada');
            }
        });
    }

    // 7. DESABILITAR COPIAR (suave - apenas mostra alerta)
    document.addEventListener('copy', function (e) {
        // Permite copiar em inputs e textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        e.preventDefault();
        mostrarAlerta('⚠️ Cópia bloqueada por segurança');
        return false;
    });

    // 8. PROTEÇÃO DE IFRAMES
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(function (iframe) {
        if (!isMobile) {
            iframe.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                return false;
            });
        }
    });

    // 9. DETECTAR FERRAMENTAS DE AUTOMAÇÃO (apenas desktop)
    if (!isMobile && navigator.webdriver) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #FAF3E0; font-family: 'Lato', sans-serif; text-align: center;">
                <div>
                    <h1 style="color: #9C7A2B;">Acesso Negado</h1>
                    <p style="color: #666;">Ferramentas de automação não são permitidas.</p>
                </div>
            </div>
        `;
    }

    // 10. ADICIONAR MARCA D'ÁGUA INVISÍVEL (apenas desktop)
    function adicionarMarcaDagua() {
        if (!isMobile) {
            const watermark = document.createElement('div');
            watermark.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                font-size: 5rem;
                color: rgba(156, 122, 43, 0.03);
                pointer-events: none;
                z-index: 9999;
                user-select: none;
                font-family: 'Playfair Display', serif;
                font-weight: 700;
            `;
            watermark.textContent = 'COZINHA DE RESPEITO';
            document.body.appendChild(watermark);
        }
    }

    // 11. FUNÇÃO PARA MOSTRAR ALERTAS
    function mostrarAlerta(mensagem) {
        // Remove alerta anterior se existir
        const alertaExistente = document.getElementById('alerta-seguranca');
        if (alertaExistente) {
            alertaExistente.remove();
        }

        const alerta = document.createElement('div');
        alerta.id = 'alerta-seguranca';
        alerta.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #9C7A2B;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: 'Lato', sans-serif;
            font-weight: 600;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            font-size: 0.9rem;
        `;
        alerta.textContent = mensagem;
        document.body.appendChild(alerta);

        setTimeout(function () {
            alerta.style.animation = 'slideOut 0.3s ease';
            setTimeout(function () {
                alerta.remove();
            }, 300);
        }, 3000);
    }

    // 12. ADICIONAR ANIMAÇÕES CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        * {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        input, textarea, button, a {
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
        }
    `;
    document.head.appendChild(style);

    // 13. INICIALIZAR PROTEÇÕES
    window.addEventListener('load', function () {
        adicionarMarcaDagua();

        // Desabilitar console apenas no desktop
        if (!isMobile && typeof console !== 'undefined') {
            console.log = function () { };
            console.warn = function () { };
            console.error = function () { };
            console.info = function () { };
            console.debug = function () { };
        }
    });

    // 14. PROTEÇÃO CONTRA DEBUGGER (REMOVIDO - causava problemas)
    // Removido para evitar travamentos

    // 15. LOG DE ACESSO (silencioso)
    if (!isMobile) {
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                // Usuário saiu da aba
            }
        });
    }

})();

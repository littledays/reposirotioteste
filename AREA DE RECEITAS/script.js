// Navigation logic for modules
function openModule(moduleId) {
    const pages = {
        'fit': 'modulo-fit.html',
        'doces': 'modulo-doces.html',
        'acai': 'modulo-acai.html',
        'sobremesas': 'modulo-sobremesas.html'
    };

    if (pages[moduleId]) {
        window.location.href = pages[moduleId];
    }
}

// Modal logic for lessons (inside module pages)
const modal = document.getElementById('pdf-modal');
const modalTitle = document.getElementById('modal-title');
const pdfIframe = document.getElementById('pdf-iframe');

function openLesson(lessonTitle) {
    if (!modal) return;

    modalTitle.textContent = lessonTitle;

    // Simulate loading content
    const demoContent = `
        <html>
        <head>
        <style>
            body { font-family: 'Lato', sans-serif; display: flex; justify-content: center; align-items: center; height: 100%; margin: 0; background: #fff; color: #333; }
            .content { text-align: center; padding: 20px; }
            h2 { color: #9C7A2B; margin-bottom: 10px; }
            p { color: #666; }
            .icon { font-size: 3rem; color: #ddd; margin-bottom: 20px; }
        </style>
        </head>
        <body>
            <div class="content">
                <div class="icon">ðŸ“„</div>
                <h2>${lessonTitle}</h2>
                <p>O conteÃºdo da aula serÃ¡ carregado aqui.</p>
                <p><small>IntegraÃ§Ã£o via Iframe</small></p>
            </div>
        </body>
        </html>
    `;

    pdfIframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(demoContent);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        pdfIframe.src = '';
    }, 300);
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Função para acessar todos os arquivos (link ofuscado)
function acessarTodosArquivos() {
    // Link ofuscado em Base64
    const encodedLink = 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL2ZvbGRlcnMvMXkwaTNVMUxCRDJHR2VRNTJpVXJwSFdiS3VCNHZrbE5wP3VzcD1kcml2ZV9saW5r';
    
    // Decodifica e abre o link
    const decodedLink = atob(encodedLink);
    window.open(decodedLink, '_blank');
}

// Adiciona evento ao botão de acesso ao Drive
const btnDriveAccess = document.getElementById('btn-drive-access');
if (btnDriveAccess) {
    btnDriveAccess.addEventListener('click', function(e) {
        e.preventDefault();
        acessarTodosArquivos();
    });
}

// Função para abrir WhatsApp
function abrirWhatsApp() {
    // Número ofuscado em Base64
    const numeroOfuscado = 'aHR0cHM6Ly93YS5tZS81NTExOTg4ODg4ODg4'; // Substitua pelo número real
    const decodedUrl = atob(numeroOfuscado);
    window.open(decodedUrl, '_blank');
}

# Script para gerar todas as páginas de PDF - VERSÃO FINAL COM PROTEÇÃO E ANTI-CALOTE
$pdfs = @(
    @{Title = "300 Receitas de Marmitas Fitness"; Link = "https://drive.google.com/file/d/1eOUzonOfDdle6shTMTQiYLKcl3NAwFH6/view?usp=drive_link"; File = "fit-300-receitas.html"; Module = "fit" },
    @{Title = "Ingredientes para 60 marmitas de frango"; Link = "https://drive.google.com/file/d/1Zgtw0I93baNOjzNfqKcNIuYw5D6qZd4Z/view?usp=drive_link"; File = "fit-ingredientes-60-marmitas.html"; Module = "fit" },
    @{Title = "Estrategia organica para vendas de marmitas fitness"; Link = "https://drive.google.com/file/d/1jGJkl8_tBzn5FLJfISSYnS9vsVSdddc8/view?usp=drive_link"; File = "fit-estrategia-organica.html"; Module = "fit" },
    @{Title = "Plano de Negocio"; Link = "https://drive.google.com/file/d/1dX5XIHsVzt2bJNWXvpnajaWB9Lk6zHQD/view?usp=drive_link"; File = "fit-plano-negocio.html"; Module = "fit" },
    @{Title = "Recheios lucrativos"; Link = "https://drive.google.com/file/d/1UrpRCWvLEnKyoGeIECEiALgIylUfAFC3/view?usp=drive_link"; File = "doces-recheios-lucrativos.html"; Module = "doces" },
    @{Title = "Brigadeiro sem forno"; Link = "https://drive.google.com/file/d/1owgf7cI1Ui9nuGCU11UgKmzGtFp4wygb/view?usp=drive_link"; File = "doces-brigadeiro-sem-forno.html"; Module = "doces" },
    @{Title = "60 receitas de trufas lucrativas"; Link = "https://drive.google.com/file/d/1SEMe6-foBoHd_jUrswNyinlh9Ro9G29-/view?usp=drive_link"; File = "doces-60-trufas.html"; Module = "doces" },
    @{Title = "Tortas geladas no pote"; Link = "https://drive.google.com/file/d/1_2W_2lADXRA1fLHX3VEUzCoc_gU-XMer/view?usp=drive_link"; File = "doces-tortas-geladas.html"; Module = "doces" },
    @{Title = "100 receitas de bolo no pote"; Link = "https://drive.google.com/file/d/1kPq3F9SAbMSRPj9zkxpBb7V-YkvxaIzZ/view?usp=drive_link"; File = "doces-100-bolos-pote.html"; Module = "doces" },
    @{Title = "Recheios que nao vao ao fogo Volume 1"; Link = "https://drive.google.com/file/d/1F448f8R0fBuscasd_paTgg1PmAOYiBnF/view?usp=drive_link"; File = "doces-recheios-vol1.html"; Module = "doces" },
    @{Title = "Recheios que nao vao ao fogo Volume 2"; Link = "https://drive.google.com/file/d/1lPi8U7V3Tm67WU2077GGD7FKNNOx4WJP/view?usp=drive_link"; File = "doces-recheios-vol2.html"; Module = "doces" },
    @{Title = "Lucrar com batidinhas de acai"; Link = "https://drive.google.com/file/d/1VxmUq2IHZ1wt0EzxCg01_nlf_ZJ2iu4t/view?usp=drive_link"; File = "acai-batidinhas.html"; Module = "acai" },
    @{Title = "Receitas de acai"; Link = "https://drive.google.com/file/d/1UvvKDypn3zWe4HLwpxFkCg6Pomj9BiQR/view?usp=drive_link"; File = "acai-receitas.html"; Module = "acai" },
    @{Title = "70 Geladinhos Gourmet"; Link = "https://drive.google.com/file/d/1Ka6-KNaSU2s2-iyl4aE1A7dbx14M_yV_/view?usp=drive_link"; File = "acai-70-geladinhos-gourmet.html"; Module = "acai" },
    @{Title = "Geladinhos Alcoolicos"; Link = "https://drive.google.com/file/d/1Kx9BnrfyS0iWmOubukgvQr6h9pPMLgDe/view?usp=drive_link"; File = "acai-geladinhos-alcoolicos.html"; Module = "acai" },
    @{Title = "Geladinho FIT"; Link = "https://drive.google.com/file/d/1f8Fc5ftzubcimdEr_SVkjaB6MYIkMjmj/view?usp=drive_link"; File = "acai-geladinho-fit.html"; Module = "acai" },
    @{Title = "Bolo de sorvete"; Link = "https://drive.google.com/file/d/1lZINJQ1K3oYVAz4lOL2lYgAT1pcVbXyN/view?usp=drive_link"; File = "sobremesas-bolo-sorvete.html"; Module = "sobremesas" },
    @{Title = "Sorvete caseiro"; Link = "https://drive.google.com/file/d/1lZINJQ1K3oYVAz4lOL2lYgAT1pcVbXyN/view?usp=drive_link"; File = "sobremesas-sorvete-caseiro.html"; Module = "sobremesas" },
    @{Title = "Donuts magnificos"; Link = "https://drive.google.com/file/d/1Wbn5jqECtP5YUfgqGeYxeE0EgPBdmcEk/view?usp=drive_link"; File = "sobremesas-donuts.html"; Module = "sobremesas" },
    @{Title = "Pudim sem forno"; Link = "https://drive.google.com/file/d/13NhqZmGAI2UbuzMCxqx-oPocVTt6vJlQ/view?usp=drive_link"; File = "sobremesas-pudim-sem-forno.html"; Module = "sobremesas" }
)

$basePath = "c:\Users\Guilherme\Desktop\AREA DE RECEITAS\pdfs"

foreach ($pdf in $pdfs) {
    $encodedLink = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($pdf.Link))
    
    $html = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($pdf.Title) | Cozinha de Respeito</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="pdf-page">
    
    <!-- Header Premium -->
    <header class="pdf-header">
        <div class="container">
            <div class="pdf-header-content">
                <div class="logo-section">
                    <i class="fa-solid fa-utensils"></i>
                    <span>Cozinha de Respeito</span>
                </div>
                <a href="../modulo-$($pdf.Module).html" class="btn-back-header">
                    <i class="fa-solid fa-arrow-left"></i>
                    Voltar
                </a>
            </div>
        </div>
        <div class="header-divider"></div>
    </header>

    <!-- PDF Content Section -->
    <section class="pdf-content-section">
        <div class="container-fluid">
            <!-- Titulo -->
            <h1 class="pdf-title">$($pdf.Title)</h1>

            <!-- PDF Viewer -->
            <div class="pdf-viewer-container-full">
                <iframe id="pdf-iframe" width="100%" height="100%" style="border:none;" allow="fullscreen"></iframe>
            </div>
        </div>
    </section>

    <script src="../protecao.js"></script>
    <script src="../anti-calote.js"></script>
    <script src="../script.js"></script>
    <script>
        // Link ofuscado especifico desta pagina
        const pdfData = '$encodedLink';
        
        // Carrega o PDF
        window.addEventListener('DOMContentLoaded', function() {
            const decodedLink = atob(pdfData);
            const embedLink = decodedLink.replace('/view?usp=drive_link', '/preview');
            
            document.getElementById('pdf-iframe').src = embedLink;
        });
    </script>
</body>
</html>
"@
    
    $filePath = Join-Path $basePath $pdf.File
    Set-Content -Path $filePath -Value $html -Encoding UTF8
    Write-Host "Atualizado: $($pdf.File)" -ForegroundColor Green
}

Write-Host "`nTodas as 20 paginas foram atualizadas com sucesso!" -ForegroundColor Cyan

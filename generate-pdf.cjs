const fs = require('fs');
const { marked } = require('marked');
const path = require('path');

// Lire le fichier Markdown
const mdContent = fs.readFileSync('DOCUMENTATION_TECHNIQUE.md', 'utf-8');

// Convertir en HTML
const htmlContent = marked.parse(mdContent);

// Template HTML avec styles pour impression PDF
const fullHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation Technique - Portfolio Randy</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 100%;
            margin: 0;
            padding: 20px;
            background: white;
        }
        
        h1 {
            color: #2563eb;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
            margin-top: 30px;
            page-break-after: avoid;
        }
        
        h2 {
            color: #1e40af;
            border-bottom: 2px solid #93c5fd;
            padding-bottom: 8px;
            margin-top: 25px;
            page-break-after: avoid;
        }
        
        h3 {
            color: #1e3a8a;
            margin-top: 20px;
            page-break-after: avoid;
        }
        
        h4 {
            color: #1e293b;
            margin-top: 15px;
        }
        
        code {
            background-color: #f1f5f9;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            color: #dc2626;
        }
        
        pre {
            background-color: #1e293b;
            color: #f8fafc;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            page-break-inside: avoid;
        }
        
        pre code {
            background-color: transparent;
            color: #f8fafc;
            padding: 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            page-break-inside: avoid;
        }
        
        th, td {
            border: 1px solid #cbd5e1;
            padding: 12px;
            text-align: left;
        }
        
        th {
            background-color: #2563eb;
            color: white;
            font-weight: 600;
        }
        
        tr:nth-child(even) {
            background-color: #f8fafc;
        }
        
        blockquote {
            border-left: 4px solid #2563eb;
            margin: 15px 0;
            padding: 10px 20px;
            background-color: #eff6ff;
            page-break-inside: avoid;
        }
        
        ul, ol {
            margin: 10px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 5px 0;
        }
        
        a {
            color: #2563eb;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 30px 0;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        @media print {
            body {
                font-size: 11pt;
            }
            
            h1 {
                font-size: 24pt;
            }
            
            h2 {
                font-size: 18pt;
            }
            
            h3 {
                font-size: 14pt;
            }
            
            a {
                color: #2563eb;
                text-decoration: underline;
            }
            
            pre, blockquote, table {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    ${htmlContent}
    
    <script>
        // Auto-print when opened (optional - comment out if not needed)
        // window.onload = function() {
        //     window.print();
        // }
    </script>
</body>
</html>
`;

// Écrire le fichier HTML
fs.writeFileSync('DOCUMENTATION_TECHNIQUE.html', fullHtml);

console.log('✅ Fichier HTML généré avec succès : DOCUMENTATION_TECHNIQUE.html');
console.log('');
console.log('📄 Pour générer le PDF :');
console.log('   1. Ouvrez DOCUMENTATION_TECHNIQUE.html dans votre navigateur');
console.log('   2. Utilisez Ctrl+P (ou Cmd+P sur Mac)');
console.log('   3. Sélectionnez "Enregistrer au format PDF"');
console.log('   4. Ajustez les marges si nécessaire');
console.log('');
console.log('Ou utilisez cette commande si Chrome/Chromium est installé :');
console.log('   google-chrome --headless --print-to-pdf=DOCUMENTATION_TECHNIQUE.pdf DOCUMENTATION_TECHNIQUE.html');

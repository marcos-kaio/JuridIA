import pdf from "html-pdf";
import { marked } from "marked";

export async function generatePdf(text) {
  // Converte Markdown em HTML e monta a estrutura html
  const htmlBody = marked.parse(text);
  const html = `
    <html>
      <head>
        <meta charset="utf-8"/>
        <style>
          body { font-family: sans-serif; margin: 25px; }
          pre, code { background: #f5f5f5; padding: 4px; border-radius: 4px; }
          strong { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Documento Simplificado</h1>
        ${htmlBody}
      </body>
    </html>`;

  // Retorna uma Promise que resolve com o Buffer do PDF
  return new Promise((resolve, reject) => {
    pdf.create(html, { format: "A4", childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null'
      }
    } }).toBuffer((err, buffer) => {
      if (err) return reject(err);
      resolve(buffer);
    });
  });
}

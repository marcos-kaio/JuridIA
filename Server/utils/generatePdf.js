import pdf from "html-pdf";
import { marked } from "marked";

export function markdownToHtml(text) {
  return marked.parse(text);
}

export function wrapHtmlBody(bodyHtml) {
  return `
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
        ${bodyHtml}
      </body>
    </html>
  `;
}

export function generatePdf(html) {
  return new Promise((resolve, reject) => {
    pdf.create(html, { format: "A4" }).toBuffer((err, buffer) => {
      if (err) return reject(err);
      resolve(buffer);
    });
  });
}

export async function generatePdfFromMarkdown(text) {
  const htmlBody = markdownToHtml(text);
  const html = wrapHtmlBody(htmlBody);
  return await generatePdf(html);
}

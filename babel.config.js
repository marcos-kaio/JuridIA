module.exports = {
  presets: [
    // Transpila sintaxe moderna para CommonJS compatível com Node
    ['@babel/preset-env', { targets: { node: 'current' } }],

    // Se usar React, descomente a linha abaixo:
    // '@babel/preset-react'
  ],
};
module.exports = {
  // Indica para transformar arquivos .js/.jsx com babel-jest
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  // Extensões de arquivo a serem testadas
  //moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Caso use React Testing Library
  //setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
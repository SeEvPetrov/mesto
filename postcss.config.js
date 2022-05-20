// плагины
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // плагины
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};

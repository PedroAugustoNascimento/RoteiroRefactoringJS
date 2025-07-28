const { readFileSync } = require('fs');

// exportando módulo
module.exports = class Repositorio {
    constructor() {
      this.pecas = JSON.parse(readFileSync('./pecas.json'));
    }
  
    getPeca(apre) {
      return this.pecas[apre.id];
    }
}
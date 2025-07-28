const {readFileSync} = require('fs');

class Repositorio{
    constructor(){
        this.pecas = JSON.parse(readFileSync('./pecas.json'));
    }

    // função de get para as peças (Commit 2)
    getPeca(apresentacao) {
    return this.pecas[apresentacao.id];
    }
}
module.exports = Repositorio
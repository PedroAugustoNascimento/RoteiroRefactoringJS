var {gerarFaturaStr, gerarFaturaHTML} = require("./apresentacao.js"); // pegando as funções da classe apresentação
var ServicoCalculoFatura = require("./servico.js"); // pegando as funções da classe serviço
var Repositorio = require("./repositorio.js"); // pegando as funções da classe repositorio
var ServicoCalculoFatura = require("./servico.js"); // pegando as funções da classe servico
const { readFileSync } = require('fs');

//main
const calc = new ServicoCalculoFatura(new Repositorio());
const faturas = JSON.parse(readFileSync('./faturas.json'));

const faturaStr = gerarFaturaStr(faturas, calc);
const faturaHTML = gerarFaturaHTML(faturas, calc);

console.log(faturaStr);
//console.log(faturaHTML);



const ServicoCalculoFatura = require('./ServicoCalculoFatura');
const Repositorio = require('./Repositorio');
const { readFileSync } = require('fs');

// função para formatar a moeda (Commit 3)
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
}

// realocando a posição e corrigindo alguns códigos (Commit 5)
function gerarFaturaStr(fatura) {
  let totalFatura = 0;
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    const peca = calc.repo.getPeca(apre); // 
    let total = calc.calcularTotalApresentacao(apre); 

    // Função FormatarMoeda incluída (Commit 3)
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`; 
    totalFatura += total;
  }

  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}\n`; // -> Função formatarMoeda incluída (Commit 3) 
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCredito(fatura.apresentacoes)} \n`; 
  return faturaStr;
}

// função para gerar fatura em HTML (Commit 6)
function gerarFaturaHTML(fatura,calc){
  let faturaStr = `<html>\n<p>Fatura ${fatura.cliente}</p>\n<ul>\n`;
  for (let apre of fatura.apresentacoes) {
    const peca = calc.repo.getPeca(apre).nome; // 
    let total = calc.calcularTotalApresentacao(apre); 

    // Função FormatarMoeda incluída (Commit 3)
    faturaStr += `<li>${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>\n`; 
  }

  faturaStr += `</ul>\n` 
  faturaStr += `<p>Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}</p>\n`; // -> Função formatarMoeda incluída (Commit 3) 
  faturaStr += `<p>Créditos acumulados: ${calc.calcularTotalCredito(fatura.apresentacoes)}</p>\n`; 
  faturaStr += `</html>` 
  return faturaStr;
}

const calc = new ServicoCalculoFatura(new Repositorio());
const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas, calc);
const faturaHTML = gerarFaturaHTML(faturas, calc);

console.log(faturaStr);
//console.log(faturaHTML);


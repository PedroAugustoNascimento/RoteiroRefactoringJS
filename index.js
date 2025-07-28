const { readFileSync } = require('fs');
const ServicoCalculoFatura = require('./ServicoCalculoFatura');

// função para formatar a moeda (Commit 3)
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
}

// realocando a posição e corrigindo alguns códigos (Commit 5)
function gerarFaturaStr(fatura, pecas) {
  let totalFatura = 0;
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    const peca = calc.getPeca(apre, pecas); // 
    let total = calc.calcularTotalApresentacao(apre, pecas); 

    // Função FormatarMoeda incluída (Commit 3)
    faturaStr += `  ${calc.getPeca(apre, pecas).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)\n`; 
    totalFatura += total;
  }

  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura, pecas))}\n`; // -> Função formatarMoeda incluída (Commit 3) 
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCredito(pecas, fatura.apresentacoes)} \n`; 
  return faturaStr;
}

// função para gerar fatura em HTML (Commit 6)
function gerarFaturaHTML(fatura, pecas, calc){
  let faturaStr = `<html>\n<p>Fatura ${fatura.cliente}</p>\n<ul>\n`;
  for (let apre of fatura.apresentacoes) {
    const peca = calc.getPeca(apre, pecas); // 
    let total = calc.calcularTotalApresentacao(apre, pecas); 

    // Função FormatarMoeda incluída (Commit 3)
    faturaStr += `<li>${calc.getPeca(apre, pecas).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)</li>\n`; 
  }

  faturaStr += `</ul>\n` 
  faturaStr += `<p>Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura, pecas))}</p>\n`; // -> Função formatarMoeda incluída (Commit 3) 
  faturaStr += `<p>Créditos acumulados: ${calc.calcularTotalCredito(pecas, fatura.apresentacoes)}</p>\n`; 
  faturaStr += `</html>` 
  return faturaStr;
}

const calc = new ServicoCalculoFatura();
const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas,calc);
const faturaHTML = gerarFaturaHTML(faturas, pecas,calc);

console.log(faturaStr);
//console.log(faturaHTML);


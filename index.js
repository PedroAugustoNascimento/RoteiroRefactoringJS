const { readFileSync } = require('fs');

// função para formatar a moeda (Commit 3)
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
}

// função de get para as peças (Commit 2)
function getPeca(apresentacao, pecas) {
  return pecas[apresentacao.id];
}

// créditos para próximas contratações (Commit 2)
function calcularCredito(apre, pecas) {
  let creditos = 0;
  creditos += Math.max(apre.audiencia - 30, 0);
  if (getPeca(apre, pecas).tipo === "comedia")
    creditos += Math.floor(apre.audiencia / 5);
  return creditos;
}

function calcularTotalCredito(pecas, apresentacoes) { // -> Commit 4 - Função calcular total credito
  let creditos = 0;
  for (let apre of apresentacoes) {
    creditos += calcularCredito(apre, pecas); 
  }
  return creditos;
}

// função para calcular o total da apresentação (Commit 4)
function calcularTotalApresentacao(apre, pecas) {
  let total = 0;
  switch (getPeca(apre, pecas).tipo) { 
    case "tragedia":
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
      break;
    case "comedia":
      total = 30000;
      if (apre.audiencia > 20) {
        total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
      break;
    default:
      throw new Error(`Peca desconhecia: ${getPeca(apre, pecas).tipo}`); 
  }
  return total;
}

// função para calcular o total da fatura (Commit 5)
function calcularTotalFatura(faturaJSON, pecas) {
  let fatura = 0;
  for (let apre of faturaJSON.apresentacoes) {
    fatura += calcularTotalApresentacao(apre, pecas); 
  }
  return fatura;
}

// realocando a posição e corrigindo alguns códigos (Commit 5)
function gerarFaturaStr(fatura, pecas) {
  let totalFatura = 0;
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    const peca = getPeca(apre, pecas); // 
    let total = calcularTotalApresentacao(apre, pecas); 

    // Função FormatarMoeda incluída (Commit 3)
    faturaStr += `  ${getPeca(apre, pecas).nome}: ${formatarMoeda(calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)\n`; 
    totalFatura += total;
  }

  faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura(fatura, pecas))}\n`; // -> Função formatarMoeda incluída (Commit 3) 
  faturaStr += `Créditos acumulados: ${calcularTotalCredito(pecas, fatura.apresentacoes)} \n`; 
  return faturaStr;
}

// função para gerar fatura em HTML (Commit 6)
function gerarFaturaHTML(fatura, pecas){
  let faturaStr = `<html>\n<p>Fatura ${fatura.cliente}</p>\n<ul>\n`;
  for (let apre of fatura.apresentacoes) {
    const peca = getPeca(apre, pecas); // 
    let total = calcularTotalApresentacao(apre, pecas); 

    // Função FormatarMoeda incluída (Commit 3)
    faturaStr += `<li>${getPeca(apre, pecas).nome}: ${formatarMoeda(calcularTotalApresentacao(apre, pecas))} (${apre.audiencia} assentos)</li>\n`; 
  }

  faturaStr += `</ul>\n` 
  faturaStr += `<p>Valor total: ${formatarMoeda(calcularTotalFatura(fatura, pecas))}</p>\n`; // -> Função formatarMoeda incluída (Commit 3) 
  faturaStr += `<p>Créditos acumulados: ${calcularTotalCredito(pecas, fatura.apresentacoes)}</p>\n`; 
  faturaStr += `</html>` 
  return faturaStr;
}


const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
const faturaHTML = gerarFaturaHTML(faturas, pecas);

console.log(faturaStr);
console.log(faturaHTML);


const { readFileSync } = require('fs');

function gerarFaturaStr(fatura, pecas) {
  let totalFatura = 0;
  let creditos = 0;

  function getPeca(apresentacao) {
    return pecas[apresentacao.id];
  }

  // const peca = pecas[apre.id]; -> Segundo refactoring
  function calcularTotalApresentacao(apre) {
    let total = 0;
    switch (getPeca(apre).tipo) {
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
        throw new Error(`Peca desconhecia: ${getPeca(apre).tipo}`);
    }
    return total;
  }

  // créditos para próximas contratações (Commit 2)
  function calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  function calcularTotalCredito() { // -> Commit 4 - Função calcular total credito
    let creditos = 0;
    for (let apre of fatura.apresentacoes) {
      creditos += calcularCredito(apre);
    }
    return creditos;
  }

  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    const peca = getPeca(apre);
    let total = calcularTotalApresentacao(apre);

    // Função FormatarMoeda incluída (Commit 3)
    faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    totalFatura += total;

  function calcularTotalFatura(faturaJSON) {
    let fatura = 0;
    for (let apre of faturaJSON.apresentacoes) {
      fatura += calcularTotalApresentacao(apre); // ERRO ESTAVA AQUI -> função estava fora do escopo
  }
    return fatura;
}
  }

  faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura(fatura))}\n`; // -> Função formatarMoeda incluída (Commit 3)
  faturaStr += `Créditos acumulados: ${calcularTotalCredito()} \n`;
  return faturaStr;
}

// função para formatar a moeda (Commit 3)
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
}

// OBS: Esta versão da função está sobrescrita — mantida por clareza
function calcularTotalFatura() {
  let totalFatura;
  let total;
  return totalFatura += total / 100;
}




const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);

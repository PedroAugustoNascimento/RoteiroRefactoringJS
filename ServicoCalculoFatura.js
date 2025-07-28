class ServicoCalculoFatura{

constructor(){}

// função de get para as peças (Commit 2)
getPeca(apresentacao, pecas) {
  return pecas[apresentacao.id];
}

// créditos para próximas contratações (Commit 2)
calcularCredito(apre, pecas) {
  let creditos = 0;
  creditos += Math.max(apre.audiencia - 30, 0);
  if (this.getPeca(apre, pecas).tipo === "comedia")
    creditos += Math.floor(apre.audiencia / 5);
  return creditos;
}

calcularTotalCredito(pecas, apresentacoes) { // -> Commit 4 - Função calcular total credito
  let creditos = 0;
  for (let apre of apresentacoes) {
    creditos += this.calcularCredito(apre, pecas); 
  }
  return creditos;
}

// função para calcular o total da apresentação (Commit 4)
calcularTotalApresentacao(apre, pecas) {
  let total = 0;
  switch (this.getPeca(apre, pecas).tipo) { 
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
calcularTotalFatura(faturaJSON, pecas) {
  let fatura = 0;
  for (let apre of faturaJSON.apresentacoes) {
    fatura += this.calcularTotalApresentacao(apre, pecas); 
  }
  return fatura;
}

}
module.exports = ServicoCalculoFatura
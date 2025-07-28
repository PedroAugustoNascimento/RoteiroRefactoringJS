class ServicoCalculoFatura{

constructor(repo){
  this.repo = repo;
}

// créditos para próximas contratações (Commit 2)
calcularCredito(apre) {
  let creditos = 0;
  creditos += Math.max(apre.audiencia - 30, 0);
  if (this.repo.getPeca(apre).tipo === "comedia")
    creditos += Math.floor(apre.audiencia / 5);
  return creditos;
}

calcularTotalCredito(apresentacoes) { // -> Commit 4 - Função calcular total credito
  let creditos = 0;
  for (let apre of apresentacoes) {
    creditos += this.calcularCredito(apre); 
  }
  return creditos;
}

// função para calcular o total da apresentação (Commit 4)
calcularTotalApresentacao(apre) {
  let total = 0;
  switch (this.repo.getPeca(apre).tipo) { 
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
      throw new Error(`Peca desconhecia: ${this.repo.getPeca(apre).tipo}`); 
  }
  return total;
}

// função para calcular o total da fatura (Commit 5)
calcularTotalFatura(faturaJSON) {
  let fatura = 0;
  for (let apre of faturaJSON.apresentacoes) {
    fatura += this.calcularTotalApresentacao(apre); 
  }
  return fatura;
}

}
module.exports = ServicoCalculoFatura
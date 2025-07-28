// função para formatar a moeda (Commit 3)
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
}

// exportando módulo
module.exports = {
  formatarMoeda
};